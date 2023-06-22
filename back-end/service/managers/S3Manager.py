import os
import uuid
from http import HTTPStatus

import boto3
from dotenv import load_dotenv
from flask import Blueprint, request, session
from werkzeug.utils import secure_filename

load_dotenv()

ACCESS_KEY = os.getenv("ACCESS_KEY")
SECRET_KEY = os.getenv("SECRET_KEY")
S3_ENDPOINT = os.getenv("S3_ENDPOINT")
BUCKET_NAME = os.getenv("BUCKET_NAME")


class S3Manager:
    def __init__(self) -> None:
        self.s3_client = boto3.client(
            "s3",
            aws_access_key_id=ACCESS_KEY,
            aws_secret_access_key=SECRET_KEY,
            endpoint_url=S3_ENDPOINT,
        )
        self.bucket_name = BUCKET_NAME

    def upload_image(self, upload_file, folder):
        UPLOAD_FOLDER = "/"
        target = os.path.join(UPLOAD_FOLDER, "test")
        if not os.path.isdir(target):
            os.mkdir(target)
        filename = secure_filename(upload_file.filename)
        destination = "/".join([target, filename])
        upload_file.save(destination)
        session["uploadFilePath"] = destination

        img_id = uuid.uuid4()

        self.s3_client.upload_file(
            destination,
            self.bucket_name,
            f"{folder}/{str(img_id)}.jpg",
            ExtraArgs={"ContentType": "image/jpg", "ACL": "public-read"},
        )
        image_url = f"{S3_ENDPOINT}/{self.bucket_name}/{folder}/{str(img_id)}.jpg"
        return {"url": image_url}, HTTPStatus.OK
