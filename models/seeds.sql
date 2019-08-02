INSERT INTO genVehList (model, model_num, model_name, sub_model, start_year)
VALUES ("IK", 10, "G70", "", 01/01/2019),
("DH", 20, "G80", "", 01/01/2017),
("HI", 30, "G90", "", 01/01/2017);

INSERT INTO genCanVolts (model, model_num, net_id, tr_loc, test_loc, volt_h, volt_l)
VALUES ("IK", 10, "C-CAN", "ICU & CLU", "EF21", 2.86, 2.19),
("IK", 10, "P-CAN", "ICU & ECM", "EF21", 2.83, 2.22),
("DH", 20, "C-CAN", "IGPM & CLU", "EF21", 2.85, 2.24),
("DH", 20, "P-CAN", "IGPM & ECM", "EF21", 2.86, 2.10),
("HI", 30, "C-CAN", "IGPM & CLU", "EF21", 2.88, 2.22),
("HI", 30, "P-CAN", "IGPM & CLU", "EF21", 2.83, 2.23);

INSERT INTO genCanRes (model, model_num, start_year, end_year, net_id, test_loc, pin_h, pin_l, res_val_m, res_val_f, term_m, term_f, tot_res)
VALUES ("IK",10,2019, "", "C-CAN","EF21",2,11,117.6,117.7,"CLU","ICU",58.9),
("IK",10,2019, "", "P-CAN","EF21",3,12,119.0,113.0,"ICU","CLU",58.1),
("DH",20,2017, "", "C-CAN","EF21",17,18,120.1,115.6,"IGPM","CLU",58.9),
("DH",20,2018, "", "P-CAN","EF21",10,11,120.2,119.8,"IGPM","ECM",60.3),
("DH",20,2017,2018,"P-CAN","EF21",15,16,120.2,119.8,"IGPM","ECM",60.3),
("HI",30,2019, "", "C-CAN","EF21",2,10,120.7,119.1,"IGPM","CLU",60.1),
("HI",30,2019, "", "P-CAN","EF21",8,16,119.3,118.6,"IGPM","ECM", 60.5);

INSERT INTO GenMedia (model, model_num, model_img, c_can_img, p_can_img1, p_can_img2, test_loc_img)
VALUES ("IK", 10, "images/ik/g70.jpg", "images/ik/c_can.jpg", "images/ik/p_can.jpg", "", "images/ik/conn_local.jpg"),
("DH", 20, "images/dh/g80.jpg", "images/dh/c_can.jpg", "images/dh/p_can.jpg", "", "images/dh/conn_local.jpg"),
("HI", 30, "images/hi/g90.jpg", "images/hi/c_can.jpg", "images/hi/p_can.jpg", "", "images/hi/conn_local.jpg");
