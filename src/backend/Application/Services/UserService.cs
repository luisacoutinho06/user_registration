using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class UserService(IRepositoryBase<User> repository) : ServiceBase<User>(repository)
    {
    }
}
