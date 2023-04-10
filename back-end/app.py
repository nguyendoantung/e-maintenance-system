from flask import Flask
from testing.blueprint import blueprint as testing_blueprint
app = Flask(__name__)

app.register_blueprint(testing_blueprint)