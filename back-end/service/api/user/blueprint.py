from http import HTTPStatus

from flask import Blueprint, request
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt, jwt_required
from flask_pydantic import validate
from service.model.User import ChangePasswordModel

blueprint = Blueprint("user", __name__, url_prefix="/user")


@blueprint.route("/change_password", methods=["POST"], endpoint="/change-password")
@jwt_required()
# @cross_origin()
@validate(body=ChangePasswordModel)
def change_password():
    return {}
