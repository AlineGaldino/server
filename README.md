#Readme - Jornal diário back-end

## Configurando as dependências

Configurei o sistema utilizando o gerenciador "Yarn", para instalar as dependências definidas em package.json, execute: 

```
yarn install
```

## Configuração do MySQL
No arquivo ormconfig.json temos as variaveis de conexão do banco de dados, caso precise mudar as configurações, acesse o ormconfig.json para modifica-ló.

```
{
    host: 'localhost',
    port:      3306,
    username: 'root',
    password: 'root',
    database: 'mydb',
}
``` 

Após configurar o orm para a conexão com o banco, precisaremos criar o schema, e o resto a parte de migrations se
encarrega de fazer por nós.

para criar o schema, no terminal mysql digite:

```
create schema mydb;
```

caso deseje criar o banco com outro nome, altere também o valor no ormconfig.json

Após o schema criado e tudo configurado, execute a migration: 

```
yarn typeorm migration:run
```

yarn typeorm é uma maneira de executar a migration do projeto, se for necessário alterar, basta mudar o script definido no package.json 

## Iniciando o projeto
Com os passos acima concluídos podemos iniciar o projeto, então execute 

```
yarn dev
```
