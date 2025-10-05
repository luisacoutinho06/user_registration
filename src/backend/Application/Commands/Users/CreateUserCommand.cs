using Application.DTOs;
using MediatR;

namespace Application.Commands.Users
{
    public record CreateUserCommand(CreateUserDto UserDto) : IRequest<UserDto>;
}
