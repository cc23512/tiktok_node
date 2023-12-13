create table tiktok_user(
  id_user int auto_increment primary key,
  nome varchar(50) not null,
  apelido varchar(20) not null,
  email_user varchar(50) not null,
  senha_user varchar(12) not null
)

CREATE TABLE tiktok_video (
  id_video INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(20) NOT NULL,
  video VARCHAR(255) NOT NULL, 
  som VARCHAR(50) NOT NULL,
  id_user INT NOT NULL,
  curtidas INT NOT NULL DEFAULT 0,
  data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES tiktok_user(id_user)
);
