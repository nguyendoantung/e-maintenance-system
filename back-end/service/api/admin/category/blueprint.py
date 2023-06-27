from http import HTTPStatus

from data import Category
from flask import Blueprint, request
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt, jwt_required
from service.constant import PAGE_SIZE_DEFAULT, PAGE_SIZE_LIMIT
from service.managers.Admin import Admin
from service.utils.parse_int import parse_int, parse_int_with_limit
from utils import create_session

blueprint = Blueprint("admin/category", __name__, url_prefix="/admin/category")


@blueprint.route("/", methods=["GET"], endpoint="/get-category")
# @jwt_required()
def get_category():
    # role = get_jwt()["sub"]["role"]
    # if "admin" not in role:
    #     return {"msg": "Unauthorized!"}, HTTPStatus.UNAUTHORIZED
    # else:
    session = create_session()
    categories = session.query(Category).all()

    return {
        "data": [
            {"id": category.id, "name": category.name} for category in categories
        ]
    }, HTTPStatus.OK
