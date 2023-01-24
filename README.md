# nodejs-api-sequelize-mysql
Uma API para um sistema de controle de alunos e turmas de uma escola de inglês, usando o MySQL e o Sequelize como ORM.
### Instalação de dependência(s) utilizadas e comando para criação de migration para criar tabela de Pessoas:

> npm install --save-dev nodemon

> npm install mysql2

> npm install express@4.18.2

> npm install sequelize sequelize-cli path

> npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string
