namespace Domain.Entities
{
    public abstract class EntityBase
    {
        public int Id { get; set; }
        public DateTime RegistrationDate{ get; set; } = DateTime.UtcNow;
    }
}
