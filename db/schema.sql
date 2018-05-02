create table posts(
    id serial primary key,
    title varchar(80),
    author varchar(40),
    date varchar(30),
    description varchar(150),
    category varchar(20),
    contents varchar(50000),
    img varchar(500)
)

-- CATEGORIES

create table categories(
    id serial primary key,
    category varchar(20)
)