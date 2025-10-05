using Application.Interfaces;
using Application.Queries.Users;
using Domain.Entities;
using MediatR;

namespace Application.Handlers.Users
{
    public class GetUserByEmailHandler(IUserService userService) : IRequestHandler<GetUserByEmailQuery, User?>
    {
        private readonly IUserService _userService = userService;

        public async Task<User?> Handle(GetUserByEmailQuery request, CancellationToken cancellationToken)
        {
            return await _userService.GetByEmailAsync(request.Email);
        }
    }
}
