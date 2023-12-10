  create table tiktok_user(
    id_user int auto_increment primary key,
    nome varchar(50) not null,
    apelido varchar(20) not null,
    email_user varchar(50) not null,
    senha_user varchar(12) not null
  )

  create table tiktok_video(
    id_video int auto_increment primary key,
    titulo varchar(20) not null,
    video varchar(255) not null, 
    som varchar(50) not null,
    id_user int not null,
    foreign key (id_user) references tiktok_user(id_user)
  )








