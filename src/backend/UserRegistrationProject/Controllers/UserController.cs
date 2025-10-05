using Application.Commands.Users;
using Application.DTOs;
using Application.Queries.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserRegistrationProject.Api.Attributes;

namespace UserRegistrationProject.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] CreateUserDto dto)
        {
            var result = await _mediator.Send(new CreateUserCommand(dto));
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
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
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPut("{id}")]
        [AuthorizeUser]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateUserDto dto)
        {
            if (id != dto.Id) return BadRequest();

            var result = await _mediator.Send(new UpdateUserCommand(dto));
            return result != null ? Ok(result) : NotFound();
        }

        [HttpDelete("{id}")]
        [AuthorizeUser]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _mediator.Send(new DeleteUserCommand(id));
                return Ok();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
