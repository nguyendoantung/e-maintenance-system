import os

from app import app
from dotenv import load_dotenv

load_dotenv()

# ENV
env = os.environ
env["FLASK_APP"] = "index"
env["FLASK_DEBUG"] = "development"
BACK_END_HOST = os.getenv("BACK_END_HOST")


if __name__ == "__main__":
    app.run(port=3451, debug=True, host="0.0.0.0")
