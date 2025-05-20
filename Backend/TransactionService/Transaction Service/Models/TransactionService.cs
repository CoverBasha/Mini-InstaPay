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
            var reciever = context.Users.SingleOrDefault(u => u.UserID == request.RecieverId);
            if (reciever == null)
                return new TransactionResult { Success = false, Message = "User not found" };

            var sender = context.Users.SingleOrDefault(u => u.UserID == request.SenderId);
            if (sender == null)
                return new TransactionResult { Success = false, Message = "User not found" };
            if (request.SenderId == request.RecieverId)
                return new TransactionResult { Success = false, Message = "Cannot send money to yourself" };
            if (sender.Balance < request.Amount)
                return new TransactionResult() { Success = false, Message = "Insufficient balance" };

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

            var notification = new Notification
            {
                User = reciever,
                UserID = reciever.UserID,
                Message = $"recieved {transaction.Amount} from {sender.UserName}, transaction id: {transaction.TID}",
                Time = DateTime.UtcNow
            };

            return new TransactionResult
            {
                Result = new Transaction[] { transaction },
                Success = true,
                Message = "Done"
            };

        }
    }
}
