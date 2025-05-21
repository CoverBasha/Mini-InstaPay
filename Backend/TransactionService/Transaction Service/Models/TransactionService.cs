using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Transaction_Service.Database;
using System.Net.Http;
using System.Text.Json;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;

namespace Transaction_Service.Models
{
    public class TransactionService
    {
        private readonly InstaDbContext context;
        private readonly HttpClient httpClient;
        private const string NotificationServiceUrl = "https://localhost:7312/api/notifications";

        public TransactionService(InstaDbContext context)
        {
            this.context = context;
            
            // Configure HttpClient to ignore SSL certificate validation
            var handler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
            };
            this.httpClient = new HttpClient(handler);
        }

        public TransactionResult GetTransactions(int userId)
        {
            var sender = context.Users.SingleOrDefault(u => u.UserID == userId);

            if (sender == null)
                return new TransactionResult
                {
                    Success = false,
                    Message = "User not found"
                };

            var result = context.Transactions
                .Where(u => u.SenderID == userId || u.ReceiverID == userId)
                .Include(x => x.Sender)
                .Include(x => x.Receiver)
                .ToList();

            return new TransactionResult
            {
                Success = true,
                Result = result
            };
        }

        private async Task AddNotification(int userId, string message)
        {
            try
            {
                var notificationRequest = new
                {
                    UserId = userId,
                    Message = message
                };

                var content = new StringContent(
                    JsonSerializer.Serialize(notificationRequest),
                    System.Text.Encoding.UTF8,
                    "application/json"
                );

                await httpClient.PostAsync($"{NotificationServiceUrl}/addNotification", content);
            }
            catch (Exception ex)
            {
                // Log the error but don't fail the transaction
                Console.WriteLine($"Failed to add notification: {ex.Message}");
            }
        }

        public async Task<TransactionResult> MakeTransaction(TransactionRequest request)
        {
            var receiver = context.Users.SingleOrDefault(u => u.UserName == request.ReceiverUserName);
            if (receiver == null)
                return new TransactionResult { Success = false, Message = "User not found" };

            var sender = context.Users.SingleOrDefault(u => u.UserID == request.SenderId);
            if (sender == null)
                return new TransactionResult { Success = false, Message = "User not found" };
            if (request.SenderId == receiver.UserID)
                return new TransactionResult { Success = false, Message = "Cannot send money to yourself" };
            if (sender.Balance < request.Amount)
                return new TransactionResult() { Success = false, Message = "Insufficient balance" };

            sender.Balance -= request.Amount;
            receiver.Balance += request.Amount;

            var transaction = new Transaction
            {
                Amount = request.Amount,
                Sender = sender,
                Receiver = receiver,
                SenderID = request.SenderId,
                Time = DateTime.Now,
                ReceiverID = receiver.UserID,
                Status = TransactionStatus.Sent
            };

            context.Transactions.Add(transaction);

            var log = new BalanceLog
            {
                User = sender,
                UpdateType = UpdateType.Debit,
                BalanceBefore = sender.Balance + request.Amount,
                BalanceAfter = sender.Balance,
                Time = DateTime.Now
            };

            context.BalanceLogs.Add(log);

            log = new BalanceLog
            {
                User = receiver,
                UpdateType = UpdateType.Credit,
                BalanceBefore = receiver.Balance - request.Amount,
                BalanceAfter = receiver.Balance,
                Time = DateTime.Now
            };

            context.BalanceLogs.Add(log);

            context.SaveChanges();

            // Add notifications for both sender and receiver
            await AddNotification(sender.UserID, $"You sent ${request.Amount} to {receiver.UserName}");
            await AddNotification(receiver.UserID, $"You received ${request.Amount} from {sender.UserName}");

            return new TransactionResult
            {
                Result = new Transaction[] { transaction },
                Success = true,
                Message = "Transaction completed successfully"
            };
        }
    }
}
