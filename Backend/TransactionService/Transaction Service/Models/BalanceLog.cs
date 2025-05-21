using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Transaction_Service.Models
{
    public enum UpdateType : byte
    {
        Credit,
        Debit
    }

    public class BalanceLog
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int UserID { get; set; }

        public User? User { get; set; }

        [Required]
        public UpdateType UpdateType { get; set; }

        [Required]
        public double BalanceBefore { get; set; }

        [Required]
        public double BalanceAfter { get; set; }

        [Required]
        public DateTime Time { get; set; }
    }
}
