namespace Notification_Service.Models
{
    public class NotificationResult
    {
        public bool Success { get; set; }
        public IEnumerable<Notification> Result { get; set; }
        public string Message { get; set; }

    }
}
