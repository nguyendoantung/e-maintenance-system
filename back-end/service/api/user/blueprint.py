from http import HTTPStatus

from flask import Blueprint, request
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt, jwt_required
from flask_pydantic import validate

from service.managers.User import User
from service.managers.HistoryOrder import HistoryOrder
from service.model.User import ChangePasswordModel, CreateRepairOrder
from service.constant import PAGE_SIZE_DEFAULT, PAGE_SIZE_LIMIT
from service.utils.parse_int import parse_int, parse_int_with_limit

blueprint = Blueprint("user", __name__, url_prefix="/user")


@blueprint.route("/change_password", methods=["POST"], endpoint="/change-password")
@jwt_required()
@validate(body=ChangePasswordModel)
def change_password(**kwargs):
    body = ChangePasswordModel(**request.get_json())
    information = get_jwt()["sub"]
    user_name = information.get("user_name")
    return User().change_password(user_name, body)

@blueprint.route("/repair_order", methods=["POST"], endpoint="/create-repair-order")
@jwt_required()
@validate(body=CreateRepairOrder)
def create_repair_order(**kwargs):
    body = CreateRepairOrder(**request.get_json())
    information = get_jwt()["sub"]
    user_name = information.get("user_name")
    return User().create_repair_order(user_name, body)

@blueprint.route("/repair_order", methods=["GET"], endpoint="/get-repair-order")
@jwt_required()
def get_user_repair_order():
    params = request.args
    page = parse_int(params.get("page"), 1)
    page_size = parse_int_with_limit(
        params.get("pageSize"), PAGE_SIZE_DEFAULT, PAGE_SIZE_LIMIT
    )
    information = get_jwt()["sub"]
    user_name = information.get("user_name")
    return User().get_user_repair_order(user_name, page, page_size)

@blueprint.route("/all_repair_order", methods=["GET"], endpoint="/get-all-repair-order")
@jwt_required()
def get_all_of_user_repair_order():
    params = request.args
    page = parse_int(params.get("page"), 1)
    page_size = parse_int_with_limit(
        params.get("pageSize"), PAGE_SIZE_DEFAULT, PAGE_SIZE_LIMIT
    )
    information = get_jwt()["sub"]
    user_name = information.get("user_name")
    return User().get_all_of_user_repair_order(user_name, page, page_size)


@blueprint.route(
    "/<uuid(strict=False):order_id>/history",
    methods=["GET"],
    endpoint="get-history-one-order",
)
@jwt_required()
def get_history_one_order(order_id):
    information = get_jwt()["sub"]
    user_id = information.get("id")
    return HistoryOrder().get_history_one_order(user_id, order_id)
