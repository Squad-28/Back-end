CREATE DATABASE IF NOT EXISTS squad_28_technical_share;

USE squad_28_technical_share;

CREATE TABLE IF NOT EXISTS USER (
	id char(36) not null primary key,
	name varchar(100) not null,
	email varchar(100) not null,
	password varchar(255) not null,
	level varchar(30) not null,
	description text
);

CREATE TABLE IF NOT EXISTS KNOWLEDGE (
	id char(36) not null primary key,
	name varchar(50) not null unique
);

CREATE TABLE IF NOT EXISTS KNOWLEDGE_LIST (
	id_user char(36) not null,
	id_knowledge char(36) not null,
	knowledge_level int(1) unsigned not null,
	primary key (id_user, id_knowledge),
	foreign key (id_user) references USER (id),
	foreign key (id_knowledge) references KNOWLEDGE (id)
);