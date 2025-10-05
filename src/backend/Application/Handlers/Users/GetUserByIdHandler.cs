using Application.DTOs;
using Application.Interfaces;
using Application.Queries.Users;
using AutoMapper;
using MediatR;

namespace Application.Handlers.Users
{
    public class GetUserByIdHandler(IUserService userService, IMapper mapper) : IRequestHandler<GetUserByIdQuery, UserDto?>
    {
        private readonly IUserService _userService = userService;
        private readonly IMapper _mapper = mapper;

        public async Task<UserDto?> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetByIdNoTrackingAsync(request.Id);
            return user == null ? null : _mapper.Map<UserDto>(user);
        }
    }
}
