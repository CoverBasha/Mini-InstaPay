namespace Transaction_Service.Models
{
    public class TransactionResult
    {
        public bool Success { get; set; }
        public IEnumerable<Transaction> Result { get; set; }
        public string Message { get; set; }

    }
}
