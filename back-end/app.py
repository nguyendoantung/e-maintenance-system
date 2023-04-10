from flask import Flask
from service.authen.blueprint import blueprint as authen_blueprint

app = Flask(__name__)

app.register_blueprint(authen_blueprint)