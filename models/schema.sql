DROP DATABASE IF EXISTS can_data_db;
CREATE DATABASE can_data_db;

use can_data_db;

create table genVehList(

  id int AUTO_INCREMENT NOT NULL,
  model varchar(30) NOT NULL,
  model_num integer(3) NOT NULL,
  model_name varchar(30) NOT NULL,
  sub_model varchar(30),
  start_year int (4) NOT NULL,
  end_year int (4),
  DateUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);

create table genCanVolts (
  id int AUTO_INCREMENT NOT NULL,
  model varchar(30) NOT NULL,
  model_num integer(3) NOT NULL,
  net_id varchar(30) NOT NULL,
  tr_loc varchar(30) NOT NULL,
  test_loc varchar(30) NOT NULL,
  volt_h decimal(3,2),
  volt_l decimal(3,2),
  DateUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);

create table genCanRes (
  id int AUTO_INCREMENT NOT NULL,
  model varchar(30) NOT NULL,
  model_num integer(3) NOT NULL,
  start_year int (4) NOT NULL,
  end_year int (4),
  net_id varchar(30) NOT NULL,
  test_loc varchar(30) NOT NULL,
  pin_h int (3) NOT NULL,
  pin_l int (3) NOT NULL,
  res_val_m decimal (5,2),
  res_val_f decimal (5,2),
  term_m varchar (30),
  term_f varchar (30),
  tot_res dec (3,1),
  DateUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);

create table GenMedia (
  id int AUTO_INCREMENT NOT NULL,
  model varchar(30) NOT NULL,
  model_num integer(3) NOT NULL,
  model_img varchar(30) NOT NULL,
  c_can_img varchar(30) NOT NULL,
  p_can_img1 varchar(30) NOT NULL,
  p_can_img2 varchar(30) NOT NULL,
  test_loc_img varchar(30) NOT NULL,
  DateUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);