from io import BytesIO
from pathlib import Path
from typing import Union
from uuid import uuid4

import cloudinary.uploader
from cloudinary import CloudinaryResource

cloudinary.config(secure=True)


def upload(file: Union[Path, bytes], fmt="wav", tag="gemini"):
    file_content: bytes = file if isinstance(file, bytes) else file.read_bytes()
    public_id = f"{str(uuid4())}.{fmt}"
    metadata = cloudinary.uploader.upload(BytesIO(file_content),
                                          public_id=public_id,
                                          resource_type="raw",
                                          unique_filename=True,
                                          tags=tag)
    resource = CloudinaryResource(metadata=metadata)

    return resource.url
