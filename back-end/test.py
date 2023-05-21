from data import Category, Device, User
from utils import create_session

session = create_session()

# shop = session.query(Shop).filter(Shop.shop_name == "Cam Repaired" ).first()
# shop_member = session.query(ShopMember).filter(ShopMember.shop_id == shop.id).all()
# print(shop_member)
category = "Điện dân dụng"
# devices = session.query(Device).all()
devices = session.query(Device).join(Category, Category.name == category)
results = devices.limit(5).offset((1 - 1) * 5).all()
print([result.as_dict() for result in results])
# print(devices.all())
