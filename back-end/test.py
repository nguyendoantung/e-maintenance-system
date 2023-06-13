# from data import Category, Device, Shop, ShopMember, User
# from utils import create_session

# session = create_session()

# # shop = session.query(Shop).filter(Shop.shop_name == "Cam Repaired" ).first()
# # shop_member = session.query(ShopMember).filter(ShopMember.shop_id == shop.id).all()
# # print(shop_member)
# # category = "Điện dân dụng"
# # # devices = session.query(Device).all()
# # devices = session.query(Device).join(Category, Category.name == category)
# # results = devices.limit(5).offset((1 - 1) * 5).all()
# # print([result.as_dict() for result in results])
# # print(devices.all())

# shop = session.query(Shop).filter(Shop.shop_name == "Orange Shop").first()

# staffs = session.query(User).filter(User.role.contains("staff")).all()

# # for staff in staffs:
# #     shop_member = ShopMember(shop_id = shop.id, user_id = staff.id, is_admin = False)
# #     session.add(shop_member)
# #     session.commit()

# admins = session.query(User).filter(User.role.contains("admin")).all()
# for admin in admins:
#     shop_member = ShopMember(shop_id = shop.id, user_id = admin.id, is_admin = True)
#     session.add(shop_member)
#     session.commit()


# test s3
import boto3

KEY = "24b76dd698f7aca543a3"
SECRET_KEY = "DULZpUCrgSbmfrNwRk5OrlIOYBY4Qt8Bgol/Aohh"
s3 = boto3.client("s3", aws_access_key_id=KEY, aws_secret_access_key=SECRET_KEY, endpoint_url='https://s3-stg09.fptcloud.net')

# for bucket in s3.buckets.all():
#     print(bucket.name)

s3.upload_file("./cam.jpg", "anhluamaucam-bucket", "test/cam.jpg", ExtraArgs={'ContentType':'image/jpg'})