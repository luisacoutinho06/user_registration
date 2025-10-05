using Application.Commands.Users;
using Application.Interfaces;
using MediatR;

namespace Application.Handlers.Users
{
    public class DeleteUserHandler : IRequestHandler<DeleteUserCommand, Unit>
    {
        private readonly IUserService _userService;

        public DeleteUserHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetByIdAsync(request.Id) ?? throw new KeyNotFoundException("User not found.");
            await _userService.DeleteAsync(user);

            return Unit.Value;
        }
    }
}
