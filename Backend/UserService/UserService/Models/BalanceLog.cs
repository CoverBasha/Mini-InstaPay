using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace UserService.Models
{
    public enum UpdateType : byte
    {
        Credit,
        Debit
    }

    [Keyless]
    public class BalanceLog
    {
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
