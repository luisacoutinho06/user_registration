using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace UserRegistrationProject.Api.Attributes
{
    public class AuthorizeUserAttribute : AuthorizeAttribute, IAuthorizationFilter
    {
        private readonly int[] _roles;
        public AuthorizeUserAttribute(params int[] roles)
        {
            _roles = roles ?? Array.Empty<int>();
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            if (!user.Identity?.IsAuthenticated ?? true)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            if (_roles.Length != 0)
            {
                var roleClaim = user.Claims.FirstOrDefault(c => c.Type == "role")?.Value;
                if (roleClaim == null || !_roles.Contains(int.Parse(roleClaim)))
                {
                    context.Result = new ForbidResult();
                }
            }
        }
    }
}
