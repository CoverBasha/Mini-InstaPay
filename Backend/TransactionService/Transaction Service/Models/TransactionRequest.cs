namespace Transaction_Service.Models
{
    public class TransactionRequest
    {
        public int SenderId { get; set; }
        public int RecieverId { get; set; }
        public int Amount { get; set; }

    }
}
