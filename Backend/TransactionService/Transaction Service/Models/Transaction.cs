using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Transaction_Service.Models
{
    public enum TransactionStatus : byte
    {
        Pending,
        Sent,
        Failed
    }

    public class Transaction
    {
        [Key]
        public int TID { get; set; }

        public int? SenderID { get; set; }

        [ForeignKey("SenderID")]
        public User? Sender { get; set; }

        public int? ReceiverID { get; set; }

        [ForeignKey("ReceiverID")]
        public User? Receiver { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public TransactionStatus Status { get; set; }

        [Required]
        public DateTime Time { get; set; }
    }
}
