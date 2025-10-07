using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class UpdateUserDto
    {
        public int? Id { get; set; }

        [StringLength(20, MinimumLength = 8, ErrorMessage = "O nome do usuário não pode exceder 20 caracteres.")]
        public string? Username { get; set; }

        [StringLength(60, ErrorMessage = "O e-mail não pode exceder 60 caracteres.")]
        public string? Email { get; set; }

        [DataType(DataType.Password)]
        [StringLength(16, ErrorMessage = "A senha não pode exceder 16 caracteres.")]
        public string? Password { get; set; }

        [DataType(DataType.Password)]
        [StringLength(16, ErrorMessage = "A senha não pode exceder 16 caracteres.")]
        public string? PasswordConfirmed { get; set; }
    }
}
