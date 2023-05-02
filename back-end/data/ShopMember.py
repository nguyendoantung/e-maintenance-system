from data.Base import Base
from sqlalchemy import Boolean, Column, ForeignKey
from sqlalchemy_utils import UUIDType
from sqlalchemy.orm import relationship

class ShopMember(Base):
    __tablename__ = "shop_member"

    shop_id = Column(ForeignKey("shop.id"), ondelete="CASCADE", onupdate="CASCADE")
    user_id = Column(ForeignKey("user.id"), ondelete="CASCADE", onupdate="CASCADE")
    is_admin = Column(Boolean(), default=False)

    def __repr__(self):
        return str(self.__dict__)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
