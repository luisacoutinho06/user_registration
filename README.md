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
```bash
UserRegistrationProject (API)
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



