![mood hound header backend](https://github.com/The-Bugger-Ducks/mood-hound-back/assets/79321198/b522b116-22a1-430b-8977-7f944833ec89)

Esta API, que permite <>, foi desenvolvida visando sua utilização no projeto "MoodHound" (mais informações vide [este link](https://github.com/The-Bugger-Ducks/mood-hound-documentation)).

> Aplicação desenvolvida por alunos do 6º semestre do tecnólogo em Desenvolvimento de Software Multiplataforma, na FATEC Profº Jessen Vidal - São José dos Campos, SP :rocket:

### :hammer_and_wrench: Tecnologias

As seguintes tecnologias e ferramentas foram utilizadas neste projeto: `Typescript, NestJS, Prisma, PostgreSQL, Docker, Insomnia`

### :gear: Como utilizar

Para consumir esta API, é preciso seguir o passo a passo abaixo ou utilizar a URL do serviço em nuvem (através deste link: [moodHoundAPI](https://google.com)).

- Tutorial para rodar o projeto

```bash
# Baixe este repositório ou clone pelo Git usando o comando:
$ git clone https://github.com/The-Bugger-Ducks/mood-hound-back.git

# Acesse a pasta do projeto
$ cd mood-hound-back

# criar um arquivo chamado ".env" e copiar a estrutura do arquivo ".env.sample" e colocar seus respectivos dados

# instale as dependencias
$ yarn install

# Utilize o docker-compose para criar o banco de dados
$ docker-compose up -d

# Utilize o comando do Prisma para sincronizar a estrutura do banco de dados
$ npx prisma generate

# Inicie o Projeto
$ yarn start:dev
```

O servidor inciará localmente na porta 3000 (citada no arquivo .env). Use o Insomnia ou postman para simular requisições e respostas das rotas (pelo link [https://localhost:3000](https://localhost:3000)) ou utilize o projeto front-end WEB [neste link](https://github.com/The-Bugger-Ducks/mood-hound-web.git).

Caso queira usar o Insomnia para testar as rotas, use o arquivo Insomnia_2023_mm_dd.json para importar as requisições.

### Explicação da estrutura das pastas

| Pasta                                            | Definição                                                                                                |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| :open_file_folder: prisma/migrations             | Arquivos com função em versionar a estrutura do banco de dados                                           |
| :page_facing_up: prisma/schema.prisma            | Arquivo para config de estrutura e de relacionamento das entidades do banco de dados                     |
| :open_file_folder: src/                          | Arquivos com o código fonte do projeto                                                                   |
| :open_file_folder: src/modules                   | Arquivos com os módulos do serviço que se divide em varias partes do projeto                             |
| :open_file_folder: src/modules/auth              | Arquivos com foco em autenticação e autorização para acesso aos endpoints                                |
| :open*file_folder: src/ \* * / \_ \* /enums      | Arquivos de padronização de entrada para campos específicos no banco de dados                            |
| :open*file_folder: src/ \* * / \_ \* /dto        | Arquivos de padronização e validação de campos exigidos no corpo das requisições                         |
| :open*file_folder: src/ \* * / \_ \* /validation | Arquivos para criação de validações customizadas que o class-validator nao abrange                       |
| :page_facing_up: src/main.ts                     | Arquivo principal de inicialização do projeto                                                            |
| :page_facing_up: src/app.module.ts               | Arquivo para gerenciar modulos pela raíz do projeto                                                      |
| :open_file_folder: test/                         | Arquivos com foco tem testes unitários do serviço moodHound                                              |
| :page_facing_up: .editorConfig                   | Arquivo usado para padronizar a codificação do projeto como espaços em identações, pontuações etc        |
| :page_facing_up: .env                            | Arquivo usado para variáveis de ambiente como chaves de autenticação e URL do banco de dados de produção |
| :page_facing_up: .env.sample                     | Arquivo usado como molde para o verdadeiro .env                                                          |
| :page_facing_up: docker-compose.yml              | Arquivo usado para "conteinerizar" um banco postgres local                                               |
| :page_facing_up: Dockerfile                      | Arquivo usado para integração contínua de deploy em um servidor                                          |
| :page_facing_up: jest.config.json                | Arquivo usado para configurar a biblioteca JEST para execução dos testes                                 |
| :page_facing_up: insomnia_2023_mm_dd.json        | Arquivo usado para importar requisições para as rotas do projeto no Insomnia                             |
| :page_facing_up: tsconfig.json                   | Arquivo usado para configurar o typescript como sintaxe, organização de arquivos, etc.                   |
| :page_facing_up: package.json                    | Arquivo usado gerenciar as dependencias do projeto com o Yarn e compor scripts de terminal               |
