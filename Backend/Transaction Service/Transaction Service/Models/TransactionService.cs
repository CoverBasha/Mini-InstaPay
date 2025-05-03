using Transaction_Service.Database;

namespace Transaction_Service.Models
{
    public class TransactionService
    {

        InstaDbContext context;

        public TransactionService(InstaDbContext context)
        {
            this.context = context;
        }

        public TransactionResult GetTransactions(int userId)
        {
            var sender = context.Users.SingleOrDefault(u => u.UserID == userId);

            
            if (sender == null)
                return new TransactionResult
                {
                    Success = false
                };

            var result = context.Transactions.Where(u => u.SenderID == userId || u.ReceiverID == userId).ToList();

            return new TransactionResult
            {
                Success = true,
                Result = result
            };
        }

        public TransactionResult MakeTransaction(TransactionRequest request)
        {
            var reciever = context.Users.SingleOrDefault(u =>u.UserID == request.RecieverId);
            var sender = context.Users.SingleOrDefault(u => u.UserID == request.SenderId);

            if (reciever == null || sender == null)
                return new TransactionResult { Success = false, Message = "User not found" };

            if (sender.Balance < request.Amount)
                return new TransactionResult() { Success = false, Message = "Insufficient balance" };

            if (request.SenderId == request.RecieverId)
                return new TransactionResult { Success = false, Message = "Cannot send money to yourself" };


            sender.Balance -= request.Amount;

            reciever.Balance += request.Amount;

            var transaction = new Transaction
            {
                Amount = request.Amount,
                Sender = sender,
                Receiver = reciever,
                SenderID = request.SenderId,
                Time = DateTime.Now,
                ReceiverID = request.RecieverId
            };

            context.Transactions.Add(transaction);
            context.SaveChanges();

            

            return new TransactionResult
            {
                Result = new Transaction[] {transaction} ,
                Success = true,
                Message = "Done"
            };

        }
    }
}
