from datetime import timedelta

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from service.api.admin.category import blueprint as category_blueprint
from service.api.admin.device.blueprint import blueprint as device_blueprint
from service.api.admin.staff.blueprint import blueprint as admin_blueprint
from service.api.authen.blueprint import blueprint as authen_blueprint
from service.api.order.blueprint import blueprint as order_blueprint

app = Flask(__name__)

cors = CORS(app)
app.config["JWT_SECRET_KEY"] = "tungnd173451"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
jwt = JWTManager(app)

app.register_blueprint(authen_blueprint)
app.register_blueprint(admin_blueprint)
app.register_blueprint(order_blueprint)
app.register_blueprint(device_blueprint)
app.register_blueprint(category_blueprint)
