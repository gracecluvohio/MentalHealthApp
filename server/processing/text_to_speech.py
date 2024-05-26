import time
from pathlib import Path
from uuid import uuid4

from TTS.api import TTS


print(TTS().list_models().list_tts_models())

tts = TTS(model_name="tts_models/en/ljspeech/fast_pitch", progress_bar=True).to("cpu")


def text_to_speech_coqui(text: str) -> bytes:
    start_time = time.time_ns() / 1_000_000

    temp_file = Path(f"tmp/{str(uuid4())}.wav")
    tts.tts_to_file(text, speaker_wav="resources/female.wav", file_path=str(temp_file))
    audio_data = temp_file.read_bytes()
    temp_file.unlink()

    end_time = time.time_ns() / 1_000_000
    print("[Coqui] Time elapsed:", (end_time - start_time) / 1000, "s")

    return audio_data


if __name__ == "__main__":
    def main():
        text = ("I understand you're feeling stressed about your midterm. It's completely normal to feel that way, "
                "especially with an important exam coming up. Let's try to focus on what you *can* control. Can you "
                "tell me what you've already done to prepare?")
        text_to_speech_coqui(text)


    main()
