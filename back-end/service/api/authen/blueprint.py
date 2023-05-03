import json
from datetime import datetime, timedelta, timezone

from data import User
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    jwt_required,
    unset_jwt_cookies,
)
from utils import create_session

blueprint = Blueprint("authenticate", __name__, url_prefix="/authenticate")


@blueprint.route("/token", methods=["POST"])
@cross_origin()
def create_token():
    user = request.json.get("user", "")
    password = request.json.get("password", "")

    session = create_session()
    user = (
        session.query(User)
        .filter(User.email == user, User.password == password)
        .first()
    )
    if not user:
        return {"msg": "unauthorized"}, 401

    customer_identity = {
        "user_name": user.user_name,
        "role": user.role,
    }

    access_token = create_access_token(identity=customer_identity)
    response = {"access_token": access_token}
    return response


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
@cross_origin()
def my_profile():
    information = get_jwt()["sub"]
    user_name = information.get("user_name")
    user = create_session().query(User).filter(User.user_name == user_name).first()

    response_body = {
        "name": f"{user.FirstName} {user.LastName}",
        "about": user.email,
    }

    return response_body
