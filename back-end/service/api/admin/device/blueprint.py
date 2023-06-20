import os
import uuid
from http import HTTPStatus

import boto3
from flask import Blueprint, request, session
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt, jwt_required

# from PIL import Image
from service.constant import PAGE_SIZE_DEFAULT, PAGE_SIZE_LIMIT
from service.managers.Device import DeviceManager
from service.utils.parse_int import parse_int, parse_int_with_limit
from werkzeug.utils import secure_filename

blueprint = Blueprint("admin/device", __name__, url_prefix="/admin/device")


@blueprint.route("/", methods=["GET"], endpoint="/get-device")
@jwt_required()
def get_device():
    # role = get_jwt()["sub"]["role"]
    # if "admin" not in role:
    #     return {"msg": "Unauthorized!"}, HTTPStatus.UNAUTHORIZED
    # else:
    params = request.args
    category_id = params.get("category_id", "")
    page = parse_int(params.get("page"), 1)
    page_size = parse_int_with_limit(
        params.get("pageSize"), PAGE_SIZE_DEFAULT, PAGE_SIZE_LIMIT
    )
    return DeviceManager().get_device(
        category_id=category_id, page=page, page_size=page_size
    )


@blueprint.route("/device_image", methods=["POST"], endpoint="/create-device-image")
@jwt_required()
def create_device_image():
    file = request.files.get("file")
    UPLOAD_FOLDER = "/"
    target = os.path.join(UPLOAD_FOLDER, "test")
    if not os.path.isdir(target):
        os.mkdir(target)
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)
    session["uploadFilePath"] = destination
    KEY = "24b76dd698f7aca543a3"
    SECRET_KEY = "DULZpUCrgSbmfrNwRk5OrlIOYBY4Qt8Bgol/Aohh"
    s3 = boto3.client(
        "s3",
        aws_access_key_id=KEY,
        aws_secret_access_key=SECRET_KEY,
        endpoint_url="https://s3-stg09.fptcloud.net",
    )
    img_id = uuid.uuid4()

    s3.upload_file(
        destination,
        "anhluamaucam-bucket",
        f"test/{str(img_id)}.jpg",
        ExtraArgs={"ContentType": "image/jpg"},
    )
    return {"data": "hello"}


@blueprint.route("/", methods=["POST"], endpoint="/create-device")
@jwt_required()
def create_device():
    body = request.get_json()
    # print(body)
    # print(request.files)
    urls = body.get("object_url", [])

    # print(body)
    # KEY = "24b76dd698f7aca543a3"
    # SECRET_KEY = "DULZpUCrgSbmfrNwRk5OrlIOYBY4Qt8Bgol/Aohh"
    # s3 = boto3.client(
    #     "s3",
    #     aws_access_key_id=KEY,
    #     aws_secret_access_key=SECRET_KEY,
    #     endpoint_url="https://s3-stg09.fptcloud.net",
    # )
    # for url in urls:
    #     img_id = uuid.uuid4()
    #     s3.upload_file(
    #         url,
    #         "anhluamaucam-bucket",
    #         f"test/{str(img_id)}.jpg",
    #         ExtraArgs={"ContentType": "image/jpg"},
    #     )
    return {"data": "hello"}
