using Microsoft.AspNetCore.Mvc;

namespace UserService.Models
{
    public class UsersService
    {
        public async Task<AuthenticationResult> RegisterAsync(LoginRequest request)
        {
            if (request.UserName == request.Password)
                return new AuthenticationResult
                {
                    Succes = false,
                    Message = "Shala7ha"
                };

            return new AuthenticationResult
            {
                Succes = true,
                Message = "a7a"
            };
                
        }

    }
}
