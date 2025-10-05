using Domain.Entities;
using Application.Interfaces;
using Domain.Interfaces;

namespace Application.Services
{
    public class UserService(IUserRepository repository) : ServiceBase<User>(repository), IUserService
    {
        private readonly IUserRepository _repository = repository;

        public Task<User?> GetByEmailAsync(string email)
        {
            return _repository.GetByEmailAsync(email);
        }
    }
}
