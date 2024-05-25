from pathlib import Path
from typing import Dict

import jsonpickle

from structure.data_types import Username, UserProfile

user_profiles: Dict[Username, UserProfile] = dict()
USER_PROFILES_FILEPATH = Path("data/user_profiles.json")


def load_from_disk():
    if not USER_PROFILES_FILEPATH.exists():
        return
    new_chat_sessions = jsonpickle.decode(USER_PROFILES_FILEPATH.read_text(), keys=True)
    user_profiles.update(new_chat_sessions)


def write_back():
    data = jsonpickle.encode(user_profiles, keys=True)
    if not USER_PROFILES_FILEPATH.exists():
        USER_PROFILES_FILEPATH.parent.mkdir(parents=True, exist_ok=True)
        USER_PROFILES_FILEPATH.touch(exist_ok=True)
    USER_PROFILES_FILEPATH.write_text(data)
