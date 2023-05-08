//base de datos en uso en este proyecto
CREATE DATABASE biblioteca;
USE biblioteca;
CREATE TABLE escuelas(
idEscuela INT(11)NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(100),
director VARCHAR(100)
);
CREATE TABLE carreras (
idCarrera INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
idEscuelaCarrera INT NOT NULL,
nombreCarrera VARCHAR(100),
asignaturas INT,
FOREIGN KEY(idEscuelaCarrera) REFERENCES escuelas(idEscuela)
);
CREATE TABLE alumnos(
idAlumno INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
idCarreraAlumno INT NOT NULL,
nombres VARCHAR(50),
apellidos VARCHAR(50),
direccion VARCHAR(250),
telefonos VARCHAR(250),
FOREIGN KEY(idCarreraAlumno) REFERENCES carreras(idCarrera)
);
CREATE TABLE libros(
idLibro Int(11)  NOT NULL AUTO_INCREMENT PRIMARY KEY,
titulo varchar(100),
autor varchar(100),
editorial varchar(100),
fecha date,
ISBM varchar(100)
);
CREATE TABLE prestamos(
idPrestamo INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
idAlumno INT,
idLibro INT,
fechaPrestamo DATE,
fechaDevolucion DATE,
estado INT,
FOREIGN KEY(idAlumno) REFERENCES alumnos(idAlumno),
FOREIGN KEY(idLibro) REFERENCES libros(idLibro)
)
