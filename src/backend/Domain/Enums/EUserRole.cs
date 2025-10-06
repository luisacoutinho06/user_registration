using System.ComponentModel.DataAnnotations;

namespace Domain.Enums
{
    public enum EUserRole
    {
        [Display(Name = "Administrador")]
        Admin = 1,

        [Display(Name = "Gerente")]
        Manager = 2,

        [Display(Name = "Usuário Comum")]
        User = 3
    }
}
