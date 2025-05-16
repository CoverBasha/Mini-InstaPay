using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserService.Database;
using UserService.Models;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _userService;

        public UsersController(UsersService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest registerRequest)
        {
            var result = await _userService.RegisterAsync(registerRequest, HttpContext.Session);

            return !result.Succes ? BadRequest(result.Message) : Ok(result.Message);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var result = await _userService.LoginAsync(loginRequest, HttpContext.Session);

            return !result.Succes ? BadRequest(result.Message) : Ok(result.Message);
        }

        [HttpPost("charge")]
        public async Task<IActionResult> ChargeBalance(int amount, int userId)
        {
            var result = await _userService.ChargeBalance(amount, userId);

            return !result.Succes ? NotFound(result.Message) : Ok(result.Message);
        }

        [HttpPost("withdraw")]
        public async Task<IActionResult> Withdraw(int amount, int userId)
        {
            var result = await _userService.Withdraw(amount, userId);

            return !result.Succes ? BadRequest(result.Message) : Ok(result.Message);
        }
    }
}
