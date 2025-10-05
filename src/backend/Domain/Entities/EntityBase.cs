namespace Domain.Entities
{
    public abstract class EntityBase
    {
        public int Id { get; set; }
        public DateTime RegistrationData { get; set; } = DateTime.UtcNow;
    }
}
