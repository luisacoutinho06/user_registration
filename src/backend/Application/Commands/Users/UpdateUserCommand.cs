using Application.DTOs;
using MediatR;

namespace Application.Commands.Users
{
    public record UpdateUserCommand(UpdateUserDto UpdateUserDto) : IRequest<UserDto>;
}
