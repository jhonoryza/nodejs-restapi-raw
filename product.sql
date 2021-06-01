-- CREATE DATABASE restful_db;

CREATE TABLE product(
product_id INT(11) PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(200),
product_price INT(11) 
)ENGINE=INNODB;

INSERT INTO product(product_name,product_price) VALUES
('Product 1','2000'),
('Product 2','5000'),
('Product 3','4000'),
('Product 4','6000'),
('Product 5','7000');