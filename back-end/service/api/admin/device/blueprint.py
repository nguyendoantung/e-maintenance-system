from http import HTTPStatus

from flask import Blueprint, request
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt, jwt_required

from service.constant import PAGE_SIZE_DEFAULT, PAGE_SIZE_LIMIT
from service.managers.Device import DeviceManager
from service.utils.parse_int import parse_int, parse_int_with_limit

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
