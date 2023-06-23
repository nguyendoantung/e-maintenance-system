CREATE DATABASE IF NOT EXISTS `E-maintenance-system`;
-- DROP DATABASE `E-maintenance-system`;
use `E-maintenance-system`;

# create table user 
Create table if not exists `user` (
	id binary(16) not null,
    user_name varchar(200) not null,
    password varchar(1000) not null,
    FirstName varchar(100) not null default "",
    LastName varchar(100) not null default "",
    role varchar(200),
    email varchar(100),
    phone varchar(20),
    profile_link varchar(200),
    Primary Key (id)
);

create table if not exists `category` (
	id binary(16) not null,
    name varchar(100) not null,
    primary key (id)
);

# create table shop
Create table if not exists `shop` (
	id binary(16) not null,
    shop_name varchar(200) not null,
    shop_image varchar(200),
    -- FOREIGN KEY (id) REFERENCES category(id) ON delete cascade on update cascade,
    Primary Key (ID)
);

# create table shop_category
create table if not exists `shop_category` (
	shop_id binary(16) not null,
    category_id binary(16) not null,
    FOREIGN KEY (shop_id) REFERENCES shop(id) ON delete cascade on update cascade,
    FOREIGN KEY (category_id) REFERENCES category(id) ON delete cascade on update cascade
);

# create table shop_member
create table if not exists `shop_member` (
	shop_id binary(16) not null,
    user_id binary(16) not null,
    is_admin boolean default False,
    FOREIGN KEY (shop_id) REFERENCES shop(ID) ON delete cascade on update cascade,
    FOREIGN KEY (user_id) REFERENCES user(ID) ON delete cascade on update cascade
);

# create table device
create table if not exists `device` (
	id binary(16) not null,
    device_type binary(16) not null,
    price int not null,
    shop_id binary(16) not null,
    image_link varchar(1000),
    PRIMARY key (id),
    FOREIGN KEY (device_type) REFERENCES category(id) on update cascade on delete cascade
);

# create table repair_order
Create table if not exists `repair_order` (
	id binary(16) not null,
    customer_id binary(16) not null,
    staff_id binary(16),
    create_date datetime not null,
    status varchar(100),
    note varchar(200),
    Primary Key (id),
    FOREIGN KEY (customer_id) REFERENCES user(ID) on update cascade on delete cascade,
    FOREIGN KEY (staff_id) REFERENCES shop_member(user_id) on update cascade on delete cascade
);

# create table cart_item
create table if not exists `order_item` (
	order_id binary(16) not null,
    item_id binary(16) not null,
    number int,
    FOREIGN KEY (order_id) REFERENCES repair_order(id) on update cascade on delete cascade,
	FOREIGN KEY (item_id) REFERENCES device(id) on update cascade on delete cascade 
);

# link device.shop_id to shop
ALTER table device
ADD FOREIGN KEY (shop_id) REFERENCES shop(id) on update cascade on delete cascade;

# create table history
create table if not exists `order_history` (
	id binary(16) not null,
    order_id binary(16) not null,
    customer_id binary(16) not null,
    staff_id binary(16) not null,
    price int,
    update_time datetime,
    status varchar(100),
    note varchar(200),
    rate int,
    FOREIGN KEY (order_id) REFERENCES repair_order(id) on update cascade on delete cascade,
    FOREIGN KEY (customer_id) REFERENCES user(id) on update cascade on delete cascade,
    FOREIGN KEY (staff_id) REFERENCES shop_member(user_id),
    primary key (id)
);

drop table order_history;

alter table device
add name varchar(1000);

# alter table repair order - add cloumn status, full_name, phone, category, location, device_suggest
ALTER TABLE repair_order
ADD Column (
full_name varchar(200),
phone varchar(20),
category binary(16),
location varchar(1000),
device_suggest varchar(1000)
);

# add column unit for device table
alter table device
add unit varchar(100);
# create table new if neccessary - add in future



