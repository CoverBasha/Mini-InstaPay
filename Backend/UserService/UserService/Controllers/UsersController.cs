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
        public async Task<IActionResult> Register(RegisterRequest loginRequest)
        {
            var result = await _userService.RegisterAsync(loginRequest);

            return !result.Succes ? BadRequest(result.Message) : Ok(result.Message);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var result = await _userService.LoginAsync(loginRequest);

            return !result.Succes ? BadRequest(result.Message) : Ok(result.Message);
        }
    }
}
