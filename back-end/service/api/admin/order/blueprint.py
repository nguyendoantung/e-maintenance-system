from http import HTTPStatus

from flask import Blueprint
from flask_jwt_extended import jwt_required

blueprint = Blueprint("admin/order", __name__, url_prefix="/admin/order")


@blueprint.route(
    "/reject/<uuid(strict=False):order_id>",
    methods=["PUT"],
    endpoint="admin-reject-order",
)
@jwt_required()
def reject_order(order_id):
    # role = get_jwt()["sub"]["role"]
    # if "admin" not in role:
    #     return {"msg": "Unauthorized!"}, HTTPStatus.UNAUTHORIZED
    # # admin_id = get_jwt()["sub"]["id"]
    # body = RejectOrder(**request.get_json())
    # return Admin().reject_order(body, order_id)
    return {"message": "adfakvbdfklasbd"}, HTTPStatus.OK
