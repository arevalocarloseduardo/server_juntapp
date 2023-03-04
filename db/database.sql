CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary int(5) DEFAULT NULL,
    PRIMARY KEY (id) 
);

CREATE TABLE members (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  ranking VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  date_of_birth DATE NOT NULL,
  identification_number VARCHAR(50) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  memberId VARCHAR(25) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_email (email)
);


-- CREATE DATABASE IF NOT EXISTS juntasdb;

-- USE juntasdb;

CREATE TABLE juntas(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    description VARCHAR(60) DEFAULT NULL,
    typeQuotes VARCHAR(20) DEFAULT NULL,
    typeAmount VARCHAR(20) DEFAULT NULL,
    totalAmount int(7) DEFAULT NULL,
    status VARCHAR(20) DEFAULT NULL,
    memberOwnerId VARCHAR(20) DEFAULT NULL,
    quotes int(2) DEFAULT NULL,
    juntas_members INT(11) DEFAULT NULL,
    PRIMARY KEY (id) 
);

-- CREATE DATABASE IF NOT EXISTS juntasmembersdb;

-- USE juntasmembersdb;


CREATE TABLE juntas_members(
    id INT(11) NOT NULL AUTO_INCREMENT,
    junta_id INT(11) DEFAULT NULL, 
    member_id INT(11) DEFAULT NULL, 
    PRIMARY KEY (id) 
);