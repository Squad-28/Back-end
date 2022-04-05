# Squad 28 Technical Share

> Os comandos SQL, diagramas e etc, estão no diretório `docs`.

> Para a visualização do diagrama, instale a extensão [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) do vscode ou abra a imagem.

## Sumario

- [Rodando o projeto com npm no Windows](#rodando-o-projeto-com-npm-no-windows)
- [Rodando o projeto com npm no Linux com Docker](#rodando-o-projeto-com-npm-no-linux-com-docker)
- [Rodando o projeto com docker](#rodando-o-projeto-com-docker)
- [Documentos](#documentos)

## Rodando o projeto com npm no Windows

- `npm install`
- no arquivo `.env.example` coloque as credenciais do seu banco
- renomeie de `.env.example` para `.env`
- crie o banco de dados `squad_28_technical_share`
    - `CREATE DATABASE squad_28_technical_share; USE squad_28_technical_share;`
- `npm dev`

## Rodando o projeto com docker

- `docker network create --driver bridge squad_28_technical_share`
- `docker volume create --name=v_mysql`
- `docker-compose up -d`
- caso queira rodar o phpmyadmin
    - `docker-compose -f dc.phpmyadmin.yml up -d`

## Documentos

Tabelas do banco

![](docs/banco-diagrama.png)