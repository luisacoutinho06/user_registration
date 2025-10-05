using Domain.Entities;
using Application.Interfaces;
using Domain.Interfaces;

namespace Application.Services
{
    public class UserService(IUserRepository repository) : ServiceBase<User>(repository), IUserService
    {
    }
}
