create database usersDB;
use usersDB;

create table users(
	id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, 
	nombre_usuario varchar(50) not null,
    contrasena TEXT not null,
    nombre varchar(50) not null,
    email varchar(50) not null,
    esAdmin boolean,
    primary key (id),
    unique key id (id)
);

INSERT INTO users (nombre_usuario, contrasena, nombre, email, esAdmin)
VALUES  ('juan89888', 'clave_segura123', 'Juan Pérez', 'juan.perez@example.com', 0),
    ('777sss777', 'contraseña123', 'Ana Gómez', 'ana.gomez@example.com', 1),
    ('carlos_martinez', 'clave_secreta456', 'Carlos Martínez', 'carlos.martinez@example.com', 0);
		