import pkgutil
import re
import time
from io import BytesIO
from pathlib import Path
from typing import Union

import whisper

try:
    from whisper_cpp_python import Whisper
except FileNotFoundError:
    def patch_import():
        # patch whisper on file not find error
        # https://github.com/carloscdias/whisper-cpp-python/pull/12
        regex = r"(\"darwin\":\n\s*lib_ext = \")\.so(\")"
        subst = "\\1.dylib\\2"
        # load whisper_cpp_python and substitute .so with .dylib for darwin
        package = pkgutil.get_loader("whisper_cpp_python")
        whisper_path = Path(package.path)
        whisper_cpp_py = whisper_path.parent.joinpath("whisper_cpp.py")
        content = whisper_cpp_py.read_text()
        result = re.sub(regex, subst, content, 0, re.MULTILINE)
        whisper_cpp_py.write_text(result)


    patch_import()

    from whisper_cpp_python import Whisper

model_py = whisper.load_model("tiny.en")
whisper_cpp = Whisper(model_path="/Users/tristan/Desktop/whisper.cpp/models/ggml-base.en.bin")


# Slower, prefer speech_to_text_cpp
def speech_to_text_py():
    audio = whisper.load_audio("gonna_fail.wav")
    start_time = time.time_ns() / 1_000_000
    audio = whisper.pad_or_trim(audio)  # NOTE: default trims to 30-seconds
    mel = whisper.log_mel_spectrogram(audio).to(model_py.device)
    options = whisper.DecodingOptions(
        language="en",
    )
    result = model_py.decode(mel, options)
    end_time = time.time_ns() / 1_000_000
    text = result.text
    print("[Whisper] Result:", text)
    print("[Whisper] Time elapsed:", (end_time - start_time) / 1000, "s")

    return text


def speech_to_text_cpp(file: Union[Path, bytes]):
    start_time = time.time_ns() / 1_000_000

    # Run transcription
    audio_file_content: bytes = file if isinstance(file, bytes) else file.read_bytes()
    output = whisper_cpp.transcribe(BytesIO(audio_file_content))

    end_time = time.time_ns() / 1_000_000
    text = output["text"]

    print("[Whisper] Result:", text)
    print("[Whisper] Time elapsed:", (end_time - start_time) / 1000, "s")

    return text
