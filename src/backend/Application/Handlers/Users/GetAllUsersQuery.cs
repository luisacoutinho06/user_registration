using Application.DTOs;
using Application.Queries.Users;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.Handlers.Users
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IEnumerable<UserDto>>
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public GetAllUsersQueryHandler(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users); 
        }
    }
}
