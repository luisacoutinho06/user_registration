using Application.Commands.Users;
using Application.DTOs;
using Application.Helpers;
using Application.Queries.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserRegistrationProject.WebApi.Attributes;

namespace UserRegistrationProject.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] CreateUserDto dto)
        {
            var existingUser = await _mediator.Send(new GetUserByEmailQuery(dto.Email));
            if (existingUser != null)
                return BadRequest(new { message = "Já existe um usuário cadastrado com este e-mail." });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!PasswordValidator.IsStrongPassword(dto.Password))
                return BadRequest(new { message = "A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial." });

            if (!PasswordValidator.ArePasswordsEqual(dto.Password, dto.PasswordConfirmed))
                return BadRequest(new { message = "Ambas as senhas devem ser idênticas." });

            var result = await _mediator.Send(new CreateUserCommand(dto));

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var loginResponse = await _mediator.Send(new LoginUserCommand(dto));

            if (loginResponse == null)
                return Unauthorized(new { message = "E-mail ou senha inválidos." });

            return Ok(loginResponse);
        }

        [HttpGet]
        [AuthorizeUser]
        public async Task<IActionResult> GetAll()
        {
            var result = await _mediator.Send(new GetAllUsersQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        [AuthorizeUser]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new GetUserByIdQuery(id));
            return result != null ? Ok(result) : NotFound(new { message = "Usuário não encontrado" });
        }

        [HttpPut("{id}")]
        [AuthorizeUser]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateUserDto dto)
        {
            if (id == 0)
                return BadRequest(new { message = "Usuário não encontrado." });

            if (dto.Email != null)
            {
                var existingUser = await _mediator.Send(new GetUserByEmailQuery(dto.Email));
                if (existingUser != null && existingUser.Id != id)
                    return BadRequest(new { message = "Já existe outro usuário cadastrado com este e-mail." });
            }

            if (dto.Password != null && dto.PasswordConfirmed != null)
            {
                if (!PasswordValidator.IsStrongPassword(dto.Password))
                    return BadRequest(new { message = "A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial." });

                if (!PasswordValidator.ArePasswordsEqual(dto.Password, dto.PasswordConfirmed))
                    return BadRequest(new { message = "Ambas as senhas devem ser idênticas." });
            }

            var result = await _mediator.Send(new UpdateUserCommand(dto, id));

            return result != null ? Ok(result) : NotFound(new { message = "Usuário não encontrado" });
        }

        [HttpDelete("{id}")]
        [AuthorizeUser]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _mediator.Send(new DeleteUserCommand(id));
                return Ok(new { message = "Usuário removido com sucesso" });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Usuário não encontrado" });
            }
        }
    }
}
