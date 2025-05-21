namespace Transaction_Service.Models
{
    public class TransactionRequest
    {
        public int SenderId { get; set; }
        public string ReceiverUserName { get; set; }
        public float Amount { get; set; }

    }
}
