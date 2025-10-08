# user_registration
Aplicação para cadastro de usuários com backend .NET Core e frontend Angular SPA

* Tela de autenticação utilizando usuário e senha.
* Tela de usuários, CRUD completo (listar, criar, alterar e excluir).
* Somente os usuários autenticados poderão ter acesso ao CRUD de novos usuários.
* A aplicação utiliza banco de dados relacional.
* A manipulação de dados é feita utilizando Entity Framework Core.
* A interface foi construída com Bootstrap.
* Sem utilização de scaffold.

## Backend
- Tenha .NET 6 SDK (ou 3.1+) instalado.

No projeto UserRegistrationProject.Api:
* Acesse o appsettings.json e altere a string de conexão e crie o banco de dados, ou direcione para um existente.
* Após isso apenas coloque o comando no 'Console de Gerenciador de Pacotes' o seguinte comando:
```bash
Update-Database
```
* Então execute o projeto 'UserRegistrationProject.Api'.

Endpoint Swagger: https://localhost:5001/swagger (ajuste porta conforme console).

Pacotes usados:
```bash
- EF Core (SQL Server)
- MediatR para CQRS (Queries / Commands handlers)
- AutoMapper para mapear entidades ↔ DTOs
- JWT Authentication (login por usuario/senha, token com claims)
- BCrypt para hashing de senha
- Scrutor para automatização de injeção de dependência
```
Camadas simples: Domain (Entities), Infrastructure (DbContext, Repos), Application (DTOs, Handlers, Services), Api (Controllers)

### Estrutura do projeto backend:
Essa arquitetura segue os princípios da Clean Architecture, aplicada em conjunto com os padrões DDD (Domain-Driven Design) e CQRS (Command Query Responsibility Segregation).
```bash
backend
│
├── Controllers/               # Endpoints REST, recebem requisições HTTP
│   └── UserController.cs      # Exemplo de controller chamando CQRS
│
├── Application/               # Camada de aplicação, coordena regras de negócio
│   ├── Commands/              # Comandos para alterações de estado (Create, Update, Delete)
│   ├── Queries/               # Consultas (GetById, GetAll)
│   ├── Handlers/              # Implementações do MediatR para Commands/Queries
│   ├── Services/              # Serviços que orquestram operações de negócio
│   └── DTOs/                  # Objetos de transferência de dados
│   └── Helpers/               # Classes de validação
│
├── Domain/                    # Núcleo do sistema, modelo de domínio
│   ├── Entities/              # Entidades (User, EntityBase, etc.)
│   └── Interfaces/            # Interfaces de repositórios e serviços
│
├── Infrastructure/            # Camada de infraestrutura, persistência e dados
│   ├── Context/               # DbContext do Entity Framework
│   └── Repositories/          # Implementações dos repositórios
│
├── WebApi/                    # Projeto principal da API
│   ├── appsettings.json       # Configurações do projeto
│   ├── Program.cs / Startup.cs# Inicialização da aplicação, DI e middlewares
│   └── Controllers/           # Controllers específicos da API
```
### Endpoints

- GET /api/User
- Retorna a lista de todos os usuários.
- Exemplo de resposta:
```bash
[
  {
    "id": 1,
    "username": "luisa",
    "email": "luisa@example.com"
  }
]
```
-----------------------------------------------------------------------------------------
- POST /api/User/login
- Realiza a autenticação de um usuário no sistema e retorna um token JWT que deve ser utilizado para acessar os endpoints protegidos.
Body (JSON)
```bash
{
  "email": "usuario@exemplo.com",
  "password": "SenhaForte123!"
}
```

- Exemplo de resposta:
```bash
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
-----------------------------------------------------------------------------------------
- GET /api/User/{id}
- Retorna um usuário específico pelo id.
- Parâmetros: id (int) – ID do usuário
- Exemplo de resposta:
```bash
{
  "id": 1,
  "username": "luisa",
  "email": "luisa@example.com"
}

```
-----------------------------------------------------------------------------------------
- POST /api/User
- Cria um novo usuário.
Body (JSON)
```bash
{
  "username": "novoUsuario",
  "password": "senha123",
  "email": "usuario@exemplo.com"
}
```

- Exemplo de resposta:
```bash
{
  "id": 2,
  "username": "novoUsuario",
  "email": "usuario@exemplo.com"
}
```
----------------------------------------------------------------------------------------
- PUT /api/User/{id}
- Atualiza um usuário existente.
- - Parâmetros: id (int) – ID do usuário
Body (JSON):
```bash
{
  "id": 2,
  "username": "usuarioAtualizado",
  "email": "atualizado@exemplo.com",
  "password": "novaSenha123"
}
```
----------------------------------------------------------------------------------------
- DELETE /api/User/{id}
- Remove um usuário pelo id.
- - Parâmetros: id (int) – ID do usuário
Body (JSON):
```bash
{
  "message": "Usuário removido com sucesso"
}
```
----------------------------------------------------------------------------------------

## Frontend
Frontend desenvolvido em **Angular** para integração com o backend **.NET 6**, utilizando arquitetura modular, boas práticas de componentização e comunicação via API REST.

Conceitos utilizados:
- Componentização e reuso de código
- Reactive Forms e validação dinâmica
- Comunicação com API via HttpClient
- Injeção de dependência (Dependency Injection)
- Proteção de rotas (Route Guards)
- Interceptação de requisições (HTTP Interceptor)
- Organização modular e escalável

Certifique-se de ter instalado:
- **Node.js v18+**
- **Angular CLI** (instalação global)

```bash
npm install -g @angular/cli
```

Como executar o projeto:
- Acesse o diretório do projeto:
```bash
cd frontend
```
- Instale as dependências:
```bash
npm install
```
- Execute o servidor local:
```bash
ng serve
```
- Acesse a aplicação no navegador:
```bash
http://localhost:4200/
```

### Estrutura do projeto frontend:
```bash
frontend/
│
├── src/
│   ├── app/
│   │   ├── components/                # Componentes visuais (UI)
│   │   │   ├── error/                 # Tela de erro (404, acesso negado, etc.)
│   │   │   ├── login/                 # Tela de login e autenticação
│   │   │   ├── registration/          # Tela de cadastro de usuários
│   │   │   └── users/                 # Tela de listagem e gerenciamento de usuários
│   │   │
│   │   ├── guards/                    # Guards para controle de rotas e autenticação
│   │   ├── interceptor/               # Interceptadores HTTP (ex: JWT Token)
│   │   ├── models/                    # Modelos de dados da aplicação
│   │   ├── services/                  # Serviços que consomem a API backend (.NET)
│   │   ├── validators/                # Validações customizadas de formulários
│   │   ├── app.routes.ts              # Definição das rotas principais
│   │   ├── app.component.*            # Componente raiz (layout base)
│   │   └── app.module.ts              # Módulo principal do projeto
│   │
│   ├── assets/                        # Recursos estáticos (imagens, ícones, etc.)
│   ├── environment/                   # Configurações de ambiente (dev, prod)
│   ├── index.html                     # HTML principal da aplicação
│   └── main.ts                        # Ponto de entrada Angular
│
├── angular.json                       # Configuração do Angular CLI
├── package.json                       # Dependências e scripts
├── tsconfig.app.json                  # Configuração TypeScript da aplicação
└── README.md                          # Documentação geral
```

Pacotes usados:
```bash
@angular/core -	Núcleo do framework Angular
@angular/router -	Controle de rotas e navegação
@angular/forms - Formulários reativos e validações
rxjs - Programação reativa e observáveis
bootstrap / bootstrap-icons	- Estilização e ícones
jwt-decode	- Decodificação de tokens JWT
ngx-toastr	- Exibição de notificações e alertas
sweetalert	- Exibição de notificações e alertas
```

