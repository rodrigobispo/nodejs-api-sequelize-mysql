# nodejs-api-sequelize-mysql
Uma API para um sistema de controle de alunos e turmas de uma escola de inglês, usando o MySQL e o Sequelize como ORM.

### Execução do projeto:

Rodar o seguinte comando:

```
npm run dev
```
Este comando executa o script declarado no arquivo package.json

### Instalação de dependência(s) utilizadas:

```
> npm install --save-dev nodemon

> npm install mysql2

> npm install express@4.18.2

> npm install sequelize sequelize-cli path
```

### Comando para criação de tabela Pessoas e migration:

```
npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string

npx sequelize-cli model:create --name Niveis --attributes descr_nivel:string

npx sequelize-cli model:create --name Turmas --attributes data_inicio:dateonly

npx sequelize-cli model:create --name Matriculas --attributes status:string
```

```
npx sequelize-cli db:migrate
```

### Geração de arquivo seed que possui suporte para inserção de dados:

```
npx sequelize-cli seed:generate --name demo-pessoa
```

### Execução de arquivo(s) seeds para inserções em tabela (todas, de acordo com respectivos arquivos seeds que tiverem):

```
npx sequelize-cli db:seed:all
```

### Demais comandos utilizados:

```
npx sequelize-cli db:migrate:undo
```

(se tiver executado mudança indesejada) - Este comando vai desfazer somente a última migração feita, na ordem em que os arquivos são lidos e executados pelo Sequelize (de acordo com as datas e horários no nome dos arquivos). Se você tiver rodado 3 migrações - por exemplo, das tabelas Niveis, Turmas e Matriculas, o comando npx sequelize-cli db:migrate:undo vai desfazer apenas Matriculas.

Você pode rodar o mesmo comando novamente para ir desfazendo as migrações na ordem em que foram executadas, ou usar o comando:

```
npx sequelize-cli db:migrate:undo --name [data-hora]-create-[nome-da-tabela].js
```

Desfazendo seeds. Para desfazer o último seed feito:

```
npx sequelize db:seed:undo
```

Para desfazer seeds de uma tabela específica:

```
npx sequelize-cli db:seed:undo --seed nome-do-arquivo
```

Para desfazer todos os seeds feitos:

```
npx sequelize-cli db:seed:undo:all
```

Verificação de versões desatualizadas usadas no projeto:

```
npm outdated
```

