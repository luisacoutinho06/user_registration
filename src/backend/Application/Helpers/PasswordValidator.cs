namespace Application.Helpers
{
    public static class PasswordValidator
    {
        public static bool IsStrongPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password)) return false;

            var hasUpper = password.Any(char.IsUpper);
            var hasLower = password.Any(char.IsLower);
            var hasDigit = password.Any(char.IsDigit);
            var hasSpecial = password.Any(ch => !char.IsLetterOrDigit(ch));

            return password.Length >= 8 && hasUpper && hasLower && hasDigit && hasSpecial;
        }
        public static bool ArePasswordsEqual(string password, string confirmPassword)
        {
            if (password == null || confirmPassword == null) return false;

            return password == confirmPassword;
        }
    }
}
