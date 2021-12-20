<h1 align="center"> Integração Pipedrive 🔛 Bling </h1>

<div align="center">
  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/vandermnt/integration-pipedrive-bling" />
  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/vandermnt/integration-pipedrive-bling" />
  <a href="https://www.linkedin.com/in/vanderson-mantovani/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue" />
  </a>
</div>

<h2>🛠 Preparando Ambiente </h2>

<h3>📜 Requisitos </h3>

- <a href="https://nodejs.org/en/">Nodejs</a>
- <a href="https://www.docker.com/">Docker</a>
- <a href="https://www.typescriptlang.org/">Typescript</a>

<h3> 🚀 Subindo Ambiente </h3>

Como estamos usando o Docker, não é necessário instalarmos nenhuma configuração em nossa máquina. Temos um arquivo que no caso é o `docker-compose`, que se encarrega de "orquestrar" os containers que precisamos. Em nosso `docker-compose` temos nossa apalicação e nossa base com MongoDB.

<p>🔹Instale as dependências do projeto: </p>

~~~html
npm install
~~~

<p>🔹Ajuste o arquivo .env com suas secrets</p>
<p>🔹Crie a imagem da aplicação configurada no Dockerfile:</p>

~~~html
docker build -t <NOME-DA-IMAGEM> .
~~~

<p>🔹Execute o docker compose para subir o ambiente:</p>

~~~html
docker-compose up -d
~~~

<p>🔹Após executados os comandos acima, execute o comando abaixo para verificar se os dois containers (aplicação e banco de dados) estão ok:</p>

~~~html
docker container ps
~~~

✅ Deverá ver um resultado dessa maneira, com seus containers(ambiente) ok!

![image](https://user-images.githubusercontent.com/43019713/146764827-4649dec1-07b8-4d86-a1ec-65dbfe25fe02.png)

🎬 Overview do projeto:

https://user-images.githubusercontent.com/43019713/146765486-decbe891-7504-4dba-823c-904b1bd72e5c.mp4
