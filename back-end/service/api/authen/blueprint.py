import json
from datetime import datetime, timedelta, timezone
from http import HTTPStatus

from data import User
from flask import Blueprint, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    jwt_required,
    unset_jwt_cookies,
)
from flask_pydantic import validate
from service.managers.Authenticate import Authenticate
from service.model.Authenticate import LoginModel, RegisterAccount
from utils import create_session

blueprint = Blueprint("authenticate", __name__, url_prefix="/authenticate")


@blueprint.route("/", methods=["GET"], endpoint="/test")
def create_token():
    # api receive user_name or email then check user
    return {"data": "Welcome to my backend!"}, HTTPStatus.OK


@blueprint.route("/token", methods=["POST"])
@validate(body=LoginModel)
def create_token(body: LoginModel):
    # api receive user_name or email then check user
    response = Authenticate().login(body)
    return response


@blueprint.route("/register", methods=["POST"])
@validate(body=RegisterAccount)
def register(body: RegisterAccount):
    return Authenticate().register(body)


@blueprint.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@blueprint.route("/logout", methods=["POST"])
@cross_origin()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@blueprint.route("/profile", methods=["GET"])
@jwt_required()
def my_profile():
    information = get_jwt()["sub"]
    user_name = information.get("user_name")
    user = create_session().query(User).filter(User.user_name == user_name).first()

    response_body = {
        "name": f"{user.FirstName} {user.LastName}",
        "about": user.email,
        "user_name": user.user_name,
        "email": user.email,
        "phone": user.phone,
        "profile_link": user.profile_link,
    }

    return response_body
