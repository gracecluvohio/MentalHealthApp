import os
import time
from pathlib import Path
from typing import Optional
from uuid import uuid4

import azure.cognitiveservices.speech as speechsdk
from TTS.api import TTS
from azure.cognitiveservices.speech import SpeechSynthesisResult

# Set up speech synthesizer
speech_config = speechsdk.SpeechConfig(
    subscription=os.environ.get("SPEECH_KEY"),
    region=os.environ.get("SPEECH_REGION"),
)
speech_config.speech_synthesis_voice_name = "en-US-AvaNeural"

speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)


def text_to_speech_azure(text: str) -> Optional[bytes]:
    start_time = time.time_ns() / 1_000_000
    speech_synthesis_result: SpeechSynthesisResult = speech_synthesizer.speak_text_async(text).get()
    end_time = time.time_ns() / 1_000_000

    if speech_synthesis_result.reason != speechsdk.ResultReason.SynthesizingAudioCompleted:
        return None

    print("[SpeechSynthesis] Time elapsed:", (end_time - start_time) / 1000, "s")
    return speech_synthesis_result.audio_data


print(TTS().list_models().list_tts_models())

tts = TTS(model_name="tts_models/en/ljspeech/fast_pitch", progress_bar=True).to("cpu")


def text_to_speech_coqui(text: str) -> bytes:
    start_time = time.time_ns() / 1_000_000

    temp_file = Path(f"tmp/{str(uuid4())}.wav")
    tts.tts_to_file(text, speaker_wav="female.wav", file_path=str(temp_file))
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
