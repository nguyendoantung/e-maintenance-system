import uuid
from pydantic import BaseModel

class Staff(BaseModel):
    id: uuid.UUID
    FirstName: str
    LastName: str
    email: str
    phone: str
    role: str
    user_name: str