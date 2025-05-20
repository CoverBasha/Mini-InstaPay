using Notification_Service.Database;

namespace Notification_Service.Models
{
    public class NotificationService
    {

        InstaDbContext context;

        public NotificationService(InstaDbContext context)
        {
            this.context = context;
        }

        public NotificationResult GetNotifications(int UserId)
        {
            var user = context.Users.SingleOrDefault(u => u.UserID == UserId);
            if (user == null)
                return new NotificationResult
                {
                    Success = false,
                    Message = "User not found"
                };

            var result = context.Notifications.Where(u => u.UserID == UserId).ToList().OrderByDescending(x => x.Time);

            return new NotificationResult
            {
                Success = true,
                Result = result
            };
        }

        public NotificationResult AddNotification(NotificationRequest request)
        {
            var user = context.Users.SingleOrDefault(u => u.UserID == request.UserId);
            if (user == null)
                return new NotificationResult
                {
                    Success = false,
                    Message = "User not found"
                };

            var notification = new Notification
            {
                UserID = request.UserId,
                Message = request.Message,
                Time = DateTime.Now
            };

            context.Notifications.Add(notification);
            context.SaveChanges();

            return new NotificationResult
            {
                Result = new Notification[] { notification },
                Success = true,
                Message = "Notification has been added."
            };

        }
    }
}
