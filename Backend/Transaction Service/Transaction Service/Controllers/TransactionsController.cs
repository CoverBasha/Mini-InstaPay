using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Transaction_Service.Models;

namespace Transaction_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        TransactionService transactionService;

        public TransactionsController(TransactionService transactionService)
        {
            this.transactionService = transactionService;
        }

        [HttpGet("getTransactions")]
        public async Task<IActionResult> GetTransactions(int userId)
        {
            var result = transactionService.GetTransactions(userId);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(result.Result);
        }

        [HttpPost("makeTransaction")]
        public async Task<IActionResult> MakeTransaction(TransactionRequest request)
        {
            var result = transactionService.MakeTransaction(request);

            if(!result.Success)
                return BadRequest(result.Message);

            return Ok(result.Result);
        }
    }
}
