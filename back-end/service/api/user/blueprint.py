from http import HTTPStatus

from flask import Blueprint, request
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt, jwt_required
from flask_pydantic import validate

from service.managers.User import User
from service.model.User import ChangePasswordModel, CreateRepairOrder

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
def create_repair_order(**kwargs):
    body = CreateRepairOrder(**request.get_json())
    information = get_jwt()["sub"]
    user_name = information.get("user_name")
    return User().create_repair_order(user_name, body)
