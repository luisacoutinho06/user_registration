using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class CreateUserDto
    {
        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
    }
}
