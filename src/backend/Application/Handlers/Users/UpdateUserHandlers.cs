using Application.Commands.Users;
using Application.DTOs;
using Application.Interfaces;
using MediatR;

namespace Application.Handlers.Users
{
    public class UpdateUserHandler(IUserService userService) : IRequestHandler<UpdateUserCommand, UserDto>
    {
        private readonly IUserService _userService = userService;

        public async Task<UserDto> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var userModified = await _userService.GetByIdAsync(request.UpdateUserDto.Id);
            if (userModified == null) return null;

            userModified.Username = request.UpdateUserDto.Username;
            userModified.Email = request.UpdateUserDto.Email;
            if (!string.IsNullOrEmpty(request.UpdateUserDto.Password))
            {
                userModified.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.UpdateUserDto.Password);
            }

            await _userService.UpdateAsync(userModified);

            return new UserDto
            {
                Id = userModified.Id,
                Username = userModified.Username,
                Email = userModified.Email
            };
        }
    }
}
