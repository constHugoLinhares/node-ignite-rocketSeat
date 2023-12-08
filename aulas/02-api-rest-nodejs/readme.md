npm run knex -- migrate:make create-documents // Criar a migration

npm run knex -- migrate:latest // Lê todas as migrations e as executa.


# RF (Requisitos Funcionais)

- [X] O Usuário deve poder criar uma nova transação;
- [X] O usuário deve poder obter um resumo de sua conta;
- [X] O Usuário deve poder listar todas as trasações que já ocorreram;
- [X] O usuário deve poder visualizar uma transação única;

# RN (Regras de negócio)

- [X] A transação pode ser do tipo crédito que somará ao valor total, ou débito, que subtrairá;
- [X] Deve ser possível identificar o usuário entre as requisições;
- [X] O usuário só pode visualizar transações das quais ele criou;
