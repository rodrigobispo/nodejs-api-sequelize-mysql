# Requisitos do projeto (além do crud)

> - Alguns requisitos que vão além de operações CRUD:

1. **(OK) O cliente não gostaria que registros importantes do sistema, como as Pessoas, sejam apagados definitivamente do banco de dados.**
-   *1.1. Solução: uso de paranoid true no modelo; migration com criação de coluna deletedAt (addColoumn); restauração de registro com restore() na controller*

2. **(OK) Para deixar a interface mais limpa, o cliente gostaria que na lista de Pessoas, por padrão, fossem exibidos somente os usuários ativos.**
-   *2.1. Solução: uso de escopo, defaultScope no modelo.*

3. Foram percebidas algumas falhas de validação dos formulários por parte do front-end, o que resultou em dados de email inválidos no banco. É desejável que essa validação não seja responsabilidade exclusiva do front.

4. É importante poder consultar todas as matrículas confirmadas referentes a estudante X de forma rápida.

5. O cliente gostaria de poder consultar as turmas abertas por intervalo de data, para não receber informações desnecessárias (como turmas antigas).

6. O cliente quer poder consultar as matrículas por turma e saber quais delas estão lotadas, para organizar melhor as matrículas.

7. O cliente gostaria que, uma vez que o cadastro de um estudante fosse desativado, todas as matrículas relativas a este estudante automaticamente passassem a constar como “canceladas”.