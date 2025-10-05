using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Context;

namespace Infrastructure.Repositories
{
    public class UserRepository(AppDbContext context) : RepositoryBase<User>(context), IUserRepository
    {
    }
}
