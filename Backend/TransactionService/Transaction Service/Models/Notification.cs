using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Transaction_Service.Models
{
    public class Notification
    {
        [Key]
        public int ID { get; set; }

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
