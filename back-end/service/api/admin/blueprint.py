from http import HTTPStatus

from flask import Blueprint
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt, jwt_required
from service.managers.Admin import Admin

blueprint = Blueprint("admin", __name__, url_prefix="/admin")


@blueprint.route("/staff", methods=["GET"], endpoint="/get-staff")
@jwt_required()
@cross_origin()
def get_staff():
    role = get_jwt()["sub"]["role"]
    if "admin" not in role:
        return {"msg": "Unauthorized!"}, HTTPStatus.UNAUTHORIZED
    else:
        return Admin().get_staff()
