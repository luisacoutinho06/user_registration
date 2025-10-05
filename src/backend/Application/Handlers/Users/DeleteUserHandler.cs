using Application.Commands.Users;
using Application.Interfaces;
using MediatR;

namespace Application.Handlers.Users
{
    public class DeleteUserHandler(IUserService userService) : IRequestHandler<DeleteUserCommand, Unit>
    {
        private readonly IUserService _userService = userService;

        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetByIdAsync(request.Id);
            if (user == null)
                throw new KeyNotFoundException("User not found.");

            await _userService.DeleteAsync(user);

            return Unit.Value;
        }
    }
}
