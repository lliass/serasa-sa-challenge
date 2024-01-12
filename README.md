# Teste - Brain Agriculture (Serasa)


## Tecnologias, Ferramentas e Conceitos Utilizados no Projeto
- [Node](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com)
- [JWT Authentication](https://jwt.io/introduction)
- [Typeorm](https://typeorm.io/)
- [PostgresSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Arquitetura Limpa](https://www.amazon.com.br/Arquitetura-Limpa-Artes%C3%A3o-Estrutura-Software/dp/8550804606)
- [ElephantSQL](https://www.elephantsql.com/)
- [Cyclic](https://www.cyclic.sh/)
> [!NOTE]
> Vale ressaltar que mais ferramentas foram utilizadas para diversos fins; as mesmas podem ser encontradas nas dependências do projeto (package.json). Outro ponto importante é que as ferramentas Cyclic (Deploy da Aplicação) e Elephant (Deploy do Banco de Dados) foram utilizadas para realizar o deploy da aplicação em produção.

## Documentação Técnica (POSTMAN)
- [Postman Documentação](https://documenter.getpostman.com/view/32200420/2s9YsMBX1q#fa67b3b2-5545-4d17-9310-5c59f2d5891c)

## Diagrama Entidade Relacionamento
![serasa_chellenge_diagrams drawio](https://github.com/lliass/serasa-sa-challenge/assets/50928658/415ce1f5-fba6-40a7-8c4e-82bdc4a647bc)

## Ambiente de Produção
O ambiete de produção foi composto basicamente pelo [cyclic](https://www.cyclic.sh/) (responsável pelo deploy da aplicação) e pelo [elephantSQL](https://www.elephantsql.com/) (responsável pelo deploy do banco de dados), ambos foram escolhidos por possuirem versões gratuitas.

- URL base de produção:
> https://serasa-sa-challenge.cyclic.app/api

Vale ressaltar que os **end-points** são dividios em duas categorias: **privados** e **públicos**.

Os **end-points** públicos sao responsáveis pela criação dos usuarios da aplicação, ou seja, pela criação do **token JWT** para acesso aos **end-points** **privados**.

Os **end-points** públicos são:

- Criação de usuário
```
curl --location 'https://serasa-sa-challenge.cyclic.app/api/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@serasa.com",
    "password": "mmmmmm333@@@YYYY"
}'
```
- E o login na aplicação/criação do token JWT
```
curl --location 'https://serasa-sa-challenge.cyclic.app/api/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@serasa.com",
    "password": "mmmmmm333@@@YYYY"
}'
```
> [!IMPORTANT]
> Como foi citado acima, apenas esses dois end-points são públicos, os demais end-points devem ser requisitados enviando um Bearer Token no header (Authorization) da requisicão.

## Ambiente de Desenvolvimento (Para os Devs :smile:)
Para conseguir rodar o ambiente de desenvolvimento em uma máquina pessoal o processo é bem simples, apenas um comando deve ser executado, porém é necessário possuir as seguintes ferramentas/frameworks instaladas(os): [node](https://nodejs.org/en), [docker](https://www.docker.com/), [docker Compose](https://docs.docker.com/compose/).

Comando para execução em um ambinte de desenvolvimento , caso esteja em uma ambinete Unix(OS)/Linux:
```
make up
```
A segunda opção seria para usuários que estão em uma máquina Windows ou não tenha o "make" configurado globalmente na máquina:
```
docker-compose up -d
```

Comando para parar a execução:
```
make down
```
ou
```
docker-compose down --volumes --rmi all
```

- **URL base de desenvolvimento:**
> http://localhost:3000/api ou http://application:3000/api (url gerada pelo docker network)

> [!IMPORTANT]
> Apenas lembrando que para usar esses comandos a pessoa desenvolvedora deve estar na pasta raiz do projeto :wink:
