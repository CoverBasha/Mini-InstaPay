namespace UserService.Models
{
    public class AuthenticationResult
    {
        public bool Succes { get; set; }
        public string Message { get; set; }
        public User? User { get; set; }
    }
}
