import pkgutil
import re
import time
from io import BytesIO
from pathlib import Path
from typing import Union

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

whisper_cpp = Whisper(model_path="resources/whisper.cpp/models/ggml-base.en.bin")



def speech_to_text(file: Union[Path, bytes]):
    start_time = time.time_ns() / 1_000_000

    # Run transcription
    audio_file_content: bytes = file if isinstance(file, bytes) else file.read_bytes()
    output = whisper_cpp.transcribe(BytesIO(audio_file_content))

    end_time = time.time_ns() / 1_000_000
    text = output["text"]

    print("[Whisper] Result:", text)
    print("[Whisper] Time elapsed:", (end_time - start_time) / 1000, "s")

    return text
