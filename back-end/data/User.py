from data.Base import Base
from sqlalchemy import Column, String
from sqlalchemy_utils import UUIDType


class User(Base):
    __tablename__ = "user"

    ID = Column(UUIDType(),
        primary_key=True,)
    FirstName = Column(String(100), nullable=False)
    LastName = Column(String(100), nullable=False)
    role = Column(String(20), nullable=True)
    email = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    
    def __repr__(self):
        return str(self.__dict__)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}