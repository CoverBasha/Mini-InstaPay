using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Transaction_Service.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [Required]
        [MaxLength(30)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(30)]
        public string Password { get; set; }

        [Required]
        [MaxLength(20)]
        public string PhoneNum { get; set; }

        [Required]
        public double Balance { get; set; }

        //public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
