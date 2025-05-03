using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Transaction_Service.Models
{
    [Keyless]
    public class Notification
    {
        [Required]
        public int UserID { get; set; }

        public User? User { get; set; }

        [Required]
        [MaxLength(150)]
        public string Message { get; set; }

        [Required]
        public DateTime Time { get; set; }
    }
}
