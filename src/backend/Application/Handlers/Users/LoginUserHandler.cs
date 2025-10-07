using Application.Commands.Users;
using Application.DTOs;
using Application.Interfaces;
using MediatR;

namespace Application.Handlers.Users
{
    public class LoginUserHandler : IRequestHandler<LoginUserCommand, LoginResponseDto?>
    {
        private readonly IUserService _userService;

        public LoginUserHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<LoginResponseDto?> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var dto = request.LoginDto;

            var user = await _userService.GetByEmailAsync(dto.Email);
            if (user == null) return null;

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return null;

            var token = _userService.GenerateJwtToken(user);

            return new LoginResponseDto
            {
                Username = user.Username,
                Email = user.Email,
                Token = token
            };
        }
    }
}
