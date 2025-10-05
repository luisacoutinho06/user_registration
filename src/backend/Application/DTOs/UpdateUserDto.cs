using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class UpdateUserDto
    {
        public int Id { get; set; }

        [StringLength(100, MinimumLength = 8)]
        public string Username { get; set; } = string.Empty;

        [EmailAddress(ErrorMessage = "Por favor, informe um e-mail válido.")]
        public string Email { get; set; } = string.Empty;

        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
    }
}
