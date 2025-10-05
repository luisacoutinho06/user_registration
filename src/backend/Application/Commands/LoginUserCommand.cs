using Application.DTOs;
using MediatR;

namespace Application.Commands.Users
{
    public record LoginUserCommand(LoginDto LoginDto) : IRequest<string?>;
}
