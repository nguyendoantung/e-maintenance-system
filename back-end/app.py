from datetime import timedelta

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from service.api.authen.blueprint import blueprint as authen_blueprint

app = Flask(__name__)

cors = CORS(app)
app.config["JWT_SECRET_KEY"] = "tungnd173451"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
jwt = JWTManager(app)

app.register_blueprint(authen_blueprint)