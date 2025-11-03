create table coordinates
(
    id        int auto_increment
        primary key,
    new_id    int          null,
    name      varchar(255) null,
    x         varchar(255) null,
    y         varchar(255) null,
    obs       varchar(255) null,
    Tipologia varchar(255) null
);

create table parametros
(
    id        int auto_increment
        primary key,
    idName    varchar(255) null,
    date      varchar(255) null,
    hour      varchar(255) null,
    parameter varchar(255) null,
    unit      varchar(255) null,
    obs       varchar(255) null,
    value     varchar(255) null
);


