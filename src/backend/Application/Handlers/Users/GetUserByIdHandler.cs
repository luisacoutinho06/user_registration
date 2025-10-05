using Application.DTOs;
using Application.Interfaces;
using Application.Queries.Users;
using AutoMapper;
using MediatR;

namespace Application.Handlers.Users
{
    public class GetUserByIdHandler : IRequestHandler<GetUserByIdQuery, UserDto?>
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public GetUserByIdHandler(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        public async Task<UserDto?> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetByIdNoTrackingAsync(request.Id);
            return user == null ? null : _mapper.Map<UserDto>(user);
        }
    }
}
