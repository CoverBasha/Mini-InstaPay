using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Notification_Service.Models;

namespace Notification_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        Models.NotificationService notificationService;

        public NotificationsController(Models.NotificationService notificationService)
        {
            this.notificationService = notificationService;
        }

        [HttpGet("getNotifications")]
        public async Task<IActionResult> GetNotifications(int UserId)
        {
            var result = notificationService.GetNotifications(UserId);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(result.Result);
        }

        [HttpPost("addNotification")]
        public async Task<IActionResult> AddNotification(NotificationRequest request)
        {
            var result = notificationService.AddNotification(request);

            if(!result.Success)
                return BadRequest(result.Message);

            return Ok(result);
        }
    }
}
