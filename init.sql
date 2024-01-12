CREATE TABLE userlogin (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    blocked BOOLEAN NOT NULL DEFAULT false,
    attempts INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE producer (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(20) UNIQUE NOT NULL,
    cnpj VARCHAR(20) UNIQUE,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE farm (
    id SERIAL PRIMARY KEY,
    producer_id INTEGER REFERENCES producer(id),
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    hectares_total_area NUMERIC NOT NULL,
    agricultural_total_area NUMERIC NOT NULL,
    vegetation_total_area NUMERIC NOT NULL
);

CREATE TABLE croptype (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE plantedcrop (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER REFERENCES farm(id),
    crop_type_id INTEGER REFERENCES croptype(id),
    total_planted_area NUMERIC NOT NULL
);

INSERT INTO croptype (name, description) VALUES
    ('Soja', 'Leguminosa cultivada principalmente pela produção de óleo e proteína.'),
    ('Milho', 'Cereal amplamente cultivado em diversas regiões do mundo.'),
    ('Algodão', 'Fibra natural utilizada na indústria têxtil.'),
    ('Café', 'Bebida estimulante produzida a partir dos grãos de café.'),
    ('Cana de Açúcar', 'Planta utilizada na produção de açúcar e biocombustíveis.');