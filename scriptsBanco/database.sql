CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int not null,
  "user_id" int,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" int,
  "price" int NOT NULL,
  "quantity" int DEFAULT 0,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT 'now()',
  "updated_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

insert into categories(name) values ('comida');
insert into categories(name) values ('eletronicos');
insert into categories(name) values ('automoveis');

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "product_id" int
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text not null,
  "email" int unique not null,
  "password" text NOT NULL,
  "cpf_cnpj" int unique NOT NULL,
  "cep" text,
  "address" text,
  "created_at" timestamp DEFAULT 'now()',
  "updated_at" timestamp DEFAULT 'now()'
);

ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

--procedure
create function trigger_set_timestamp()
returns trigger as $$
begin
	new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- auto updated_at products
create trigger set_timestamp
before update on products
for each row
execute procedure trigger_set_timestamp();

-- auto updated_at users
create trigger set_timestamp
before update on users
for each row
execute procedure trigger_set_timestamp();

/*
CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int UNIQUE,
  "user_id" int UNIQUE,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" int,
  "price" int NOT NULL,
  "quantity" int DEFAULT 0,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT 'now()',
  "updated_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);
select * from categories
CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "product_id" int UNIQUE
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

select instructors.*, members.name as member_name from instructors 
left join members on (members.instructor_id = instructors.id) 
order by instructors.id asc

select instructors.*, count(members) as total_members from instructors 
join members on (members.instructor_id = instructors.id) 
group by instructors.id

select count(instructors) as total_instrutor from instructors
select * from members


select * from instructors join members on (members.instructor_id = instructors.id) 
order by instructors.id asc

---------------
select m.name as aluno, m.gender as sexo, m.weight, m.height, i.name as instrutor, i.services 
from members as m left join instructors as i on m.instructor_id = i.id

select m.name as aluno, m.gender as sexo, m.weight, m.height, i.name as instrutor, i.services 
from members as m join instructors as i on m.instructor_id = i.id

select m.name as aluno, m.gender as sexo, m.weight, m.height, i.name as instrutor, i.services 
from members as m right join instructors as i on m.instructor_id = i.id

select * from instructors
limit 2 offset 3 

create function trigger_set_timestamp()
returns trigger as $$
begin
	new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_timestamp
before update on products 
for each row
execute procedure trigger_set_timestamp();




*/