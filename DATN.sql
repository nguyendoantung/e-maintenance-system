CREATE DATABASE IF NOT EXISTS `E-maintenance-system`;
use `E-maintenance-system`;

# create table user 
Create table if not exists `user` (
	ID binary(16) not null,
    FirstName varchar(100) not null,
    LastName varchar(100) not null,
    role varchar(200),
    email varchar(100),
    phone varchar(20),
    Primary Key (ID)
);

# create table shop
Create table if not exists `shop` (
	ID binary(16) not null,
    shop_name varchar(200) not null,
    category varchar(200),
    shop_image varchar(200),
    Primary Key (ID)
);

# create table shop_member
create table if not exists `shop_member` (
	shop_id binary(16) not null,
    user_id binary(16) not null,
    is_admin boolean default true,
    FOREIGN KEY (shop_id) REFERENCES shop(ID),
    FOREIGN KEY (user_id) REFERENCES user(ID)
);

# create table repair_order
Create table if not exists `repair_order` (
	order_id binary(16) not null,
    customer_id binary(16) not null,
    staff_id binary(16),
    create_date datetime not null,
    status varchar(100),
    note varchar(200),
    Primary Key (order_id),
    FOREIGN KEY (customer_id) REFERENCES user(ID),
    FOREIGN KEY (staff_id) REFERENCES shop_member(user_id)
);

# create table cart_item
create table if not exists `order_item` (
	order_id binary(16) not null,
    item_id binary(16) not null,
    number int,
    FOREIGN KEY (order_id) REFERENCES repair_order(order_id)
);