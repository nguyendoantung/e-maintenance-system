from http import HTTPStatus

from flask import Blueprint, request
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt, jwt_required
from service.constant import PAGE_SIZE_DEFAULT, PAGE_SIZE_LIMIT
from service.managers.Admin import Admin
from service.utils.parse_int import parse_int, parse_int_with_limit

blueprint = Blueprint("admin/staff", __name__, url_prefix="/admin/staff")


@blueprint.route("/", methods=["GET"], endpoint="/get-staff")
@jwt_required()
def get_staff():
    role = get_jwt()["sub"]["role"]
    if "admin" not in role:
        return {"msg": "Unauthorized!"}, HTTPStatus.UNAUTHORIZED
    else:
        params = request.args
        page = parse_int(params.get("page"), 1)
        page_size = parse_int_with_limit(
            params.get("pageSize"), PAGE_SIZE_DEFAULT, PAGE_SIZE_LIMIT
        )
        return Admin().get_staff(page=page, page_size=page_size)


@blueprint.route("/get_order", methods=["GET"], endpoint="/get-order-by-staff")
@jwt_required()
def get_order_for_staff():
    role = get_jwt()["sub"]["role"]
    if "staff" not in role:
        return {"msg": "Unauthorized!"}, HTTPStatus.UNAUTHORIZED
    else:
        params = request.args
        page = parse_int(params.get("page"), 1)
        page_size = parse_int_with_limit(
            params.get("pageSize"), PAGE_SIZE_DEFAULT, PAGE_SIZE_LIMIT
        )
        return Admin().get_order_for_staff(page=page, page_size=page_size)