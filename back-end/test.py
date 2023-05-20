from data import Shop, ShopMember
from utils import create_session

session = create_session()

shop = session.query(Shop).filter(Shop.shop_name == "Cam Repaired" ).first()
shop_member = session.query(ShopMember).filter(ShopMember.shop_id == shop.id).all()
print(shop_member)
