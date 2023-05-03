from data.Base import Base
from sqlalchemy import Boolean, Column, ForeignKey
from sqlalchemy.orm import relationship


class ShopMember(Base):
    __tablename__ = "shop_member"

    shop_id = Column(ForeignKey("shop.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
    user_id = Column(ForeignKey("user.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
    is_admin = Column(Boolean(), default=False)

    shop = relationship(
        "Shop",
        primaryjoin="ShopMember.shop_id == Shop.id",
    )

    user = relationship("User", primaryjoin="ShopMember.user_id == User.id")

    def __repr__(self):
        return str(self.__dict__)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
