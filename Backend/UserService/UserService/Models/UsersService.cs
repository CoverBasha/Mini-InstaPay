using Microsoft.AspNetCore.Mvc;
using UserService.Database;

namespace UserService.Models
{
    public class UsersService
    {
        private readonly InstaDbContext context;

        public UsersService(InstaDbContext context)
        {
            this.context = context;
        }
        
        public async Task<AuthenticationResult> RegisterAsync(RegisterRequest request, ISession session)
        {
            int? loggeduser = session.GetInt32("UserId");
            if (loggeduser != null && loggeduser > 0)
                return new AuthenticationResult
                {
                    Succes = false,
                    Message = "You are already logged in!"
                };

            var found = context.Users.SingleOrDefault(u=>u.UserName == request.Username);

            if (found != null)
                return new AuthenticationResult
                {
                    Succes = false,
                    Message = "User with same name exists"
                };

            User user = new User
            {
                UserName = request.Username,
                Password = request.Password,
                PhoneNum = request.PhoneNumber,
                Balance = 0
            };

            context.Users.Add(user);
            context.SaveChanges();

            session.SetInt32("UserId", user.UserID);

            return new AuthenticationResult
            {
                Succes = true,
                Message = "User created sccessfully"
            };
                
        }

        public async Task<AuthenticationResult> LoginAsync(LoginRequest request, ISession session)
        {
            int? loggeduser = session.GetInt32("UserId");
            if (loggeduser != null && loggeduser > 0)
                return new AuthenticationResult
                {
                    Succes = false,
                    Message = "You are already logged in!"
                };

            var found = context.Users.SingleOrDefault(u => u.UserName.ToLower() == request.Username.ToLower());

            if (found == null)
                return new AuthenticationResult
                {
                    Succes = false,
                    Message = "User doesn't exist"
                };

            if (found.Password != request.Password)
                return new AuthenticationResult
                {
                    Succes = false,
                    Message = "Password mismatch"
                };

            session.SetInt32("UserId", found.UserID);

            return new AuthenticationResult
            {
                Succes = true,
                Message = "Logged in successfully"
            };
        }

        public async Task<AuthenticationResult> ChargeBalance(int amount, int userId)
        {
            var user = context.Users.SingleOrDefault(u => u.UserID == userId);

            if (user == null)
                return new AuthenticationResult
                {
                    Succes= false,
                    Message = "User Doesn't exist"
                };

            user.Balance += amount;
            context.SaveChanges();

            return new AuthenticationResult
            {
                Succes = true,
                Message = $"Added {amount}"
            };
        }

        public async Task<AuthenticationResult> Withdraw(int amount, int userId)
        {
            var user = context.Users.SingleOrDefault(u => u.UserID == userId);

            if (user == null)
                return new AuthenticationResult
                {
                    Succes = false,
                    Message = "User Doesn't exist"
                };

            if (user.Balance < amount)
                return new AuthenticationResult
                {
                    Succes = false,
                    Message = "Balance insufficient"
                };
            
            user.Balance -= amount;
            context.SaveChanges();

            return new AuthenticationResult
            {
                Succes = true,
                Message = $"Withdrew {amount}"
            };
        }

    }
}
