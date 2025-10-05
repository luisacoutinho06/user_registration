using Domain.Entities;
using Infrastructure.Context;

namespace Infrastructure.Repositories
{
    public class UserRepository(AppDbContext context) : RepositoryBase<User>(context)
    {
    }
}
