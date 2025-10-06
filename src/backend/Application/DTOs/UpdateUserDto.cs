using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class UpdateUserDto
    {
        public int? Id { get; set; }

        [StringLength(100, MinimumLength = 8, ErrorMessage = "O nome de usuário deve ter entre 8 e 100 caracteres.")]
        public string? Username { get; set; }

        [EmailAddress(ErrorMessage = "Por favor, informe um e-mail válido.")]
        public string? Email { get; set; }

        [DataType(DataType.Password)]
        public string? Password { get; set; }
    }
}
