using Domain.Entities;

namespace Application.Interfaces
{
    public interface IUserService : IServiceBase<User>
    {
        Task<User?> GetByEmailAsync(string email);
    }
}
