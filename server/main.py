import sys
from datetime import datetime
from typing import List

import requests
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from processing import gemini
from processing.cdn import upload
from processing.gemini import prompt_gemini, user_sessions
from processing.mood import infer_mood
from processing.speech_to_text import speech_to_text_cpp
from processing.text_to_speech import text_to_speech_coqui
from structure import data_storage
from structure.data_storage import user_profiles
from structure.data_types import UserProfile, Session, Interaction, Mood

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/send_chat_message")
def send_chat_message(username: str, date: str, user_audio_url: str = None, text: str = None):
    msg_date = datetime.fromisoformat(date)

    # Extract user message from audio or text
    if user_audio_url is None:
        user_message = text
    else:
        result = requests.get(user_audio_url)
        user_audio: bytes = result.content
        user_message = speech_to_text_cpp(user_audio)

    gemini_message = prompt_gemini(username, msg_date, user_message)
    gemini_audio_url = ""
    if user_audio_url is not None:
        gemini_audio_data: bytes = text_to_speech_coqui(gemini_message)
        gemini_audio_url = upload(gemini_audio_data)

    # Retrieve session from disk
    profile: UserProfile = user_profiles.setdefault(username, dict())
    session = profile.setdefault(msg_date, Session(mood=Mood.joy, conversation=[]))

    # Infer mood if first message
    if len(session.conversation) == 0:
        mood = infer_mood(user_message)
        session.mood = mood
    else:
        mood = session.mood

    # Write to data storage
    session.conversation.append(Interaction(user_message, user_audio_url, gemini_message, gemini_audio_url))
    data_storage.write_back()

    return {
        "user_text": user_message,
        "gemini_text": gemini_message,
        "gemini_audio_url": gemini_audio_url,
        "mood": mood,
        "is_first_message": len(session.conversation) == 1,
    }


@app.get("/set_mood")
def set_mood(username: str, date: str, mood: int):
    msg_date = datetime.fromisoformat(date)
    profile: UserProfile = user_profiles[username]
    session: Session = profile[msg_date]
    session.mood = mood
    data_storage.write_back()


@app.get("/get_session_history")
def get_session_history(username: str):
    profile: UserProfile = user_profiles.get(username, dict())
    return {dt.isoformat(): session.to_json() for dt, session in profile.items()}


@app.get("/nuke")
def nuke():
    user_profiles.clear()
    data_storage.write_back()
    user_sessions.clear()
    gemini.write_back()
    return {
        "result": "done"
    }


def main(args: List[str]):
    host = "0.0.0.0"
    port = 5001
    if len(args) == 2 and args[1].isdigit():
        port = int(args[1])

    data_storage.load_from_disk()
    gemini.load_from_disk()
    uvicorn.run(app, host=host, port=port)


if __name__ == "__main__":
    sys.exit(main(sys.argv))
