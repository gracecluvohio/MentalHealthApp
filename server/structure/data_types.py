import dataclasses
from datetime import date
from enum import IntEnum, auto
from typing import List, Dict, Optional

from google.ai.generativelanguage_v1 import Content


class Mood(IntEnum):
    anger = auto()
    fear = auto()
    joy = auto()
    love = auto()
    sadness = auto()
    surprise = auto()


@dataclasses.dataclass
class Interaction:
    user_text: str
    user_audio_url: Optional[str]
    gemini_text: str
    gemini_audio_url: Optional[str]

    def to_json(self) -> dict:
        return {
            "user_text": self.user_text,
            "user_audio_url": self.user_audio_url,
            "gemini_text": self.gemini_text,
            "gemini_audio_url": self.gemini_audio_url,
        }


@dataclasses.dataclass
class Session:
    mood: Mood
    conversation: List[Interaction]

    def to_json(self) -> dict:
        return {
            "mood": self.mood.value,
            "conversation": [interaction.to_json() for interaction in self.conversation]
        }


# Types
Username = str
UserProfile = Dict[date, Session]
ChatSessions = Dict[date, List[Content]]

example = {
    "user1": {
        "2024-05-25T05:12:50Z": {  # Session
            "mood": 3,
            "conversation": [
                {  # Interaction
                    "user": "i feel sad",
                    "model": "why?",
                    "user_audio_url": "askdfjasdf",
                    "gemini_audio_url": "askdfjasdf",
                },
                {
                    "user": "i feel unworthy",
                    "model": "bro just like man up",
                    "user_audio_url": "askdfjasdf",
                    "gemini_audio_url": "askdfjasdf",
                },
            ],
        },
        "2024-05-26T05:12:50Z": {
            "mood": 3,
            "conversation": [
                {
                    "user": "i feel sad",
                    "model": "why?",
                    "user_audio_url": "askdfjasdf",
                    "gemini_audio_url": "askdfjasdf",
                },
                {
                    "user": "i feel unworthy",
                    "model": "bro just like man up",
                    "user_audio_url": "askdfjasdf",
                    "gemini_audio_url": "askdfjasdf",
                },
            ],
        },
    },
}
