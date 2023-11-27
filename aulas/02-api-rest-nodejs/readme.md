npm run knex -- migrate:make create-documents // Criar a migration

npm run knex -- migrate:latest // Lê todas as migrations e as executa.


# RF (Requisitos Funcionais)

- [ ] O Usuário deve poder criar uma nova transação;
- [ ] O usuário deve poder obter um resumo de sua conta;
- [ ] O Usuário deve poder listar todas as trasações que já ocorreram;

# RN (Regras de negócio)

- [ ] A transação pode ser do tipo crédito que somará ao valor total, ou débito, que subtrairá;
- [ ] Deve ser possível identificar o usuário entre as requisições;
- [ ] O usuário só pode visualizar transações das quais ele criou;

# RNF (Requisitos Não Funcionais)

- [ ]