import os
import uuid
from http import HTTPStatus

import boto3
from flask import Blueprint, request, session
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt, jwt_required
from service.ApiModel.ListDevice import CreateDevice

# from PIL import Image
from service.constant import PAGE_SIZE_DEFAULT, PAGE_SIZE_LIMIT
from service.managers.Device import DeviceManager
from service.managers.S3Manager import S3Manager
from service.utils.parse_int import parse_int, parse_int_with_limit
from werkzeug.utils import secure_filename

blueprint = Blueprint("admin/device", __name__, url_prefix="/admin/device")


@blueprint.route("/", methods=["GET"], endpoint="/get-device")
# @jwt_required()
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
    upload_file = request.files.get("file")
    return S3Manager().upload_image(upload_file=upload_file, folder="device")


@blueprint.route("/", methods=["POST"], endpoint="/create-device")
@jwt_required()
def create_device():
    body = request.get_json()
    role = get_jwt()["sub"]["role"]
    if "admin" not in role:
        return {"msg": "Unauthorized!"}, HTTPStatus.UNAUTHORIZED
    admin_user =  get_jwt()["sub"]["user_name"]

    device = CreateDevice(**body)

    return DeviceManager().add_device(admin_user, device)
