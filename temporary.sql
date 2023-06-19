CREATE DATABASE IF NOT EXISTS `E-maintenance-system`;
-- DROP DATABASE `E-maintenance-system`;
use `E-maintenance-system`;

select *, HEX(`id`) from category;

insert into category (id, name)
values
(unhex(replace(uuid(),'-','')), "Điện dân dụng"), # '2AD7AE60FA3111EDADD55811223F09D8'
(unhex(replace(uuid(),'-','')), "Điện nước"), # '2AD7B18BFA3111EDADD55811223F09D8'
(unhex(replace(uuid(),'-','')), "Điều hòa"), # '2AD7B224FA3111EDADD55811223F09D8'
(unhex(replace(uuid(),'-','')), "Máy giặt"), # '2AD7B287FA3111EDADD55811223F09D8'
(unhex(replace(uuid(),'-','')), "Tủ lạnh"); # '2AD7B2DEFA3111EDADD55811223F09D8'

# insert user admin
insert into user (id, user_name, password, FirstName, LastName, role, email, phone)
values
(unhex(replace(uuid(),'-','')), "Sys Admin","1", "Sys", "Admin", "user,sys_admin,admin", "tung.nd173451@sis.hust.edu.vn",""),
(unhex(replace(uuid(),'-','')), "Sub Admin","1", "Sub", "Admin", "user,admin", "nguyendoantung19991@gmail.com",""),
(unhex(replace(uuid(),'-','')), "anhluamaucam","1", "Tung", "Nguyen", "user,", "nguyendoantung310599@gmail.com",""),
(unhex(replace(uuid(),'-','')), "Staff 1","1", "Staff", "1", "user,staff", "fake1@gmail.com",""),
(unhex(replace(uuid(),'-','')), "Staff 2","1", "Staff", "2", "user,staff", "fake2@gmail.com",""),
(unhex(replace(uuid(),'-','')), "Staff 3","1", "Staff", "3", "user,staff", "fake3@gmail.com",""),
(unhex(replace(uuid(),'-','')), "Staff 4","1", "Staff", "4", "user,staff", "fake4@gmail.com",""),
(unhex(replace(uuid(),'-','')), "Staff 5","1", "Staff", "5", "user,staff", "fake5@gmail.com",""),
(unhex(replace(uuid(),'-','')), "Staff 6","1", "Staff", "6", "user,staff", "fake6@gmail.com","");

select *, hex(id) from user;
select *, hex(id) from repair_order;
select *, hex(id) from user;
select *, hex(id) from category;
select *, hex(id) from device;

insert into shop (id, shop_name)
values 
(unhex(replace(uuid(),'-','')), "Orange Shop"),
(unhex(replace(uuid(),'-','')), "2nd Dimension");

insert into device (id, name, device_type, price, shop_id, image_link)
value
(unhex(replace(uuid(),"-","")), "Ổ cắm điện 7 lỗ comet ce4433", UNHEX("2AD7AE60FA3111EDADD55811223F09D8"), "150000", UNHEX("085C7B21FBDB11EDADDA5811223F09D8"), "https://s3-stg09.fptcloud.net/anhluamaucam-bucket/device/dien_dan_dung/10053561-o-cam-dien-7-lo-comet-ces4433-2.jpg");

update user set profile_link = 'https://s3-stg09.fptcloud.net/anhluamaucam-bucket/test/cam.jpg' where user_name like "%admin%";

select *, HEX(`customer_id`),HEX(`staff_id`) from repair_order ;
select *, heX(id) from shop;
# 085C7B21FBDB11EDADDA5811223F09D8
select *, HEX(`shop_id`), HEX(`user_id`), is_admin from shop_member;
# cd826363-fbd8-11ed-adda-5811223f09d8

select * from order_history;

update device set unit = "Chiếc";
delete from device where name like "%PVC%";
select * from device;
insert into device (id, name, device_type, price, shop_id, image_link, unit)
value
(unhex(replace(uuid(),"-","")), "Ống nhựa PVC Phi 21", UNHEX("2AD7B18BFA3111EDADD55811223F09D8"), "7600", UNHEX("085C7B21FBDB11EDADDA5811223F09D8"), "https://s3-stg09.fptcloud.net/anhluamaucam-bucket/device/dien_nuoc/ong-nhua-PVC.jpg", "m"),
(unhex(replace(uuid(),"-","")), "Ống nhựa PVC Phi 27", UNHEX("2AD7B18BFA3111EDADD55811223F09D8"), "9500", UNHEX("085C7B21FBDB11EDADDA5811223F09D8"), "https://s3-stg09.fptcloud.net/anhluamaucam-bucket/device/dien_nuoc/ong-nhua-PVC.jpg", "m"),
(unhex(replace(uuid(),"-","")), "Ống nhựa PVC Phi 34", UNHEX("2AD7B18BFA3111EDADD55811223F09D8"), "12300", UNHEX("085C7B21FBDB11EDADDA5811223F09D8"), "https://s3-stg09.fptcloud.net/anhluamaucam-bucket/device/dien_nuoc/ong-nhua-PVC.jpg", "m"),
(unhex(replace(uuid(),"-","")), "Ống nhựa PVC Phi 42", UNHEX("2AD7B18BFA3111EDADD55811223F09D8"), "18400", UNHEX("085C7B21FBDB11EDADDA5811223F09D8"), "https://s3-stg09.fptcloud.net/anhluamaucam-bucket/device/dien_nuoc/ong-nhua-PVC.jpg", "m"),
(unhex(replace(uuid(),"-","")), "Ống nhựa PVC Phi 48", UNHEX("2AD7B18BFA3111EDADD55811223F09D8"), "21500", UNHEX("085C7B21FBDB11EDADDA5811223F09D8"), "https://s3-stg09.fptcloud.net/anhluamaucam-bucket/device/dien_nuoc/ong-nhua-PVC.jpg", "m"),
(unhex(replace(uuid(),"-","")), "Ống nhựa PVC Phi 60", UNHEX("2AD7B18BFA3111EDADD55811223F09D8"), "28000", UNHEX("085C7B21FBDB11EDADDA5811223F09D8"), "https://s3-stg09.fptcloud.net/anhluamaucam-bucket/device/dien_nuoc/ong-nhua-PVC.jpg", "m"),
(unhex(replace(uuid(),"-","")), "Ống nhựa PVC Phi 75", UNHEX("2AD7B18BFA3111EDADD55811223F09D8"), "39300", UNHEX("085C7B21FBDB11EDADDA5811223F09D8"), "https://s3-stg09.fptcloud.net/anhluamaucam-bucket/device/dien_nuoc/ong-nhua-PVC.jpg", "m"),
(unhex(replace(uuid(),"-","")), "Ống nhựa PVC Phi 90", UNHEX("2AD7B18BFA3111EDADD55811223F09D8"), "47900", UNHEX("085C7B21FBDB11EDADDA5811223F09D8"), "https://s3-stg09.fptcloud.net/anhluamaucam-bucket/device/dien_nuoc/ong-nhua-PVC.jpg", "m"),
(unhex(replace(uuid(),"-","")), "Ống nhựa PVC Phi 110", UNHEX("2AD7B18BFA3111EDADD55811223F09D8"), "72400", UNHEX("085C7B21FBDB11EDADDA5811223F09D8"), "https://s3-stg09.fptcloud.net/anhluamaucam-bucket/device/dien_nuoc/ong-nhua-PVC.jpg", "m"),
(unhex(replace(uuid(),"-","")), "Ống nhựa PVC Phi 140", UNHEX("2AD7B18BFA3111EDADD55811223F09D8"), "98400", UNHEX("085C7B21FBDB11EDADDA5811223F09D8"), "https://s3-stg09.fptcloud.net/anhluamaucam-bucket/device/dien_nuoc/ong-nhua-PVC.jpg", "m"),
(unhex(replace(uuid(),"-","")), "Ống nhựa PVC Phi 180", UNHEX("2AD7B18BFA3111EDADD55811223F09D8"), "160600", UNHEX("085C7B21FBDB11EDADDA5811223F09D8"), "https://s3-stg09.fptcloud.net/anhluamaucam-bucket/device/dien_nuoc/ong-nhua-PVC.jpg", "m");
# SHOW FULL PROCESSLIST;
# KILL 29;