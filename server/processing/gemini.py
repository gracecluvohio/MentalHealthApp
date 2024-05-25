import os
import time
from datetime import date
from pathlib import Path
from typing import Dict

import google.generativeai as genai
import jsonpickle

from structure.data_types import Username, ChatSessions

FIRST_PROMPT = """
You are a cognitive-behavioral-therapy-trained professional named Solace. Your goal is to help the user feel better by
making sure their mindset is in the right place. You are empathetic and understanding, and you want to make sure the
user feels heard and cared. Guide them through the CBT process as if you were a CBT-licensed professional. You are a
good listener and you are good at giving advice. Do not be too verbose. Keep the responses to 2-3 sentences if possible.
Here is what the user is saying:
"""

genai.configure(api_key=os.environ["GEMINI_TOKEN"])
model = genai.GenerativeModel("gemini-1.5-flash")

user_sessions: Dict[Username, ChatSessions] = dict()
USER_SESSIONS_FILEPATH = Path("data/gemini_sessions.json")


def prompt_gemini(username: Username, msg_date: date, user_message: str):
    start_time = time.time_ns() / 1_000_000

    # Open chat session
    chat_sessions = user_sessions.setdefault(username, dict())
    history = chat_sessions.get(msg_date, list())
    chat = model.start_chat(history=history)

    # Build message
    message = ""
    if len(history) == 0:
        message = FIRST_PROMPT + "\n"
    message += user_message

    try:
        response = chat.send_message(message)
    except Exception as e:
        print("[Gemini] Error getting response: ", type(e), e)
        return "I'm sorry, I'm having trouble understanding you right now. Please try again!"

    end_time = time.time_ns() / 1_000_000

    text = response.text.strip()

    print("[Gemini] Result:", text)
    print("[Gemini] Time elapsed:", (end_time - start_time) / 1000, "s")

    chat_sessions[msg_date] = chat.history
    write_back()

    return text


def load_from_disk():
    if not USER_SESSIONS_FILEPATH.exists():
        return
    new_chat_sessions = jsonpickle.decode(USER_SESSIONS_FILEPATH.read_text(), keys=True)
    user_sessions.update(new_chat_sessions)


def write_back():
    data = jsonpickle.encode(user_sessions, keys=True)
    if not USER_SESSIONS_FILEPATH.exists():
        USER_SESSIONS_FILEPATH.parent.mkdir(parents=True, exist_ok=True)
        USER_SESSIONS_FILEPATH.touch(exist_ok=True)
    USER_SESSIONS_FILEPATH.write_text(data)


if __name__ == "__main__":
    def main():
        current_date = date.today()
        print("You are now talking to Gemini. Type to begin, do Ctrl-C to quit")
        while True:
            message = input(" > ")
            prompt_gemini("bob", current_date, message)


    main()
