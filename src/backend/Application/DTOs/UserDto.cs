using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }

        [StringLength(100, MinimumLength = 8)]
        public string Username { get; set; } = string.Empty;

        [EmailAddress(ErrorMessage = "Por favor, informe um e-mail válido.")]
        public string Email { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; }
        public EUserRole Role { get; set; }
    }
}
