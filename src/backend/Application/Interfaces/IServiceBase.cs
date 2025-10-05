using Domain.Entities;

namespace Application.Interfaces
{
    public interface IServiceBase<T> where T : EntityBase
    {
        Task<T> AddAsync(T entity);
        Task<T?> GetByIdAsync(int id);
        Task<T?> GetByIdNoTrackingAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
    }
}
