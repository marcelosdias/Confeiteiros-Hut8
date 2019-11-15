# Backend - Feed My Party

## Para instalar todas configurações (iniciar projeto):
 - Assegure-se que há um servidor sql instalado na sua máquina ([instalar mysql](https://www.digitalocean.com/community/tutorials/como-instalar-o-mysql-no-ubuntu-18-04-pt))
 - Antes de iniar o projeto certifique-se que o arquivo .env contém as configurações corretas;
 - Siga as instruções da seção Arquivo de environments.

```
npm run-script project-init
```

## Para iniciar o servidor (desenvolvimento):
 
```
npm run-script dev
```

## Arquivo de environments:
 - Criar arquivo .env;
 - Seguir a etrutura:
    ```
    # App params:
    PORT=<inserir a porta que o servidor irá escutar>

    # Database config

    DB_HOST=<inserir host do banco de dados (ex.: localhost)>
    DB_USER=<inserir usuário do banco de dados (ex.: root)>
    DB_PASS=<inserir senha do usuário (ex.: root)>
    ```
