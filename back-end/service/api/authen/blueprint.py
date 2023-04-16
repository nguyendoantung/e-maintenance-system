import json
from datetime import datetime, timedelta, timezone

from flask import Blueprint, Flask, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt,
    get_jwt_identity,
    jwt_required,
    unset_jwt_cookies,
)

blueprint = Blueprint("authenticate", __name__, url_prefix="/authenticate")

@blueprint.route('/token', methods=["POST"])
@cross_origin()
def create_token():
    email=request.json.get("email", "")
    password = request.json.get("password", "")

    if email != "tung.nd173451@sis.hust.edu.vn" or password != "WnnL4454":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
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
    response_body = {
        "name": "Nguyen Doan Tung",
        "about" :"tung.nd173451@sis.hust.edu.vn"
    }

    return response_body

