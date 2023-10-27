using FinancialSchool.Interfaces.Repositories;
using FinancialSchool.Models.Dal;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FinancialSchool.Controllers
{
    [ApiController]
    [Route("api/Coins")]
    public class CoinsController : ControllerBase
    {
        private readonly ICoinsRepository _CoinsRepository;

        public CoinsController(ICoinsRepository CoinsRepository)
        {
            _CoinsRepository = CoinsRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllCoinsAsync()
        {
            return Ok(await _CoinsRepository.GetAllCoinsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCoinsLinesByClassIdAsync(string id)
        {
            return Ok(await _CoinsRepository.GetCoinByIdAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult> InsertCoinsAsync([FromBody] Coin newCoin)
        {
            return Ok(await _CoinsRepository.InsertCoinAsync(newCoin));
        }

        [HttpPut("{coinId}/{newWorth}")]
        public async Task<ActionResult> UpdateCoin(int newWorth, string coinId)
        {
            return Ok(await _CoinsRepository.UpdateCoinWorthByIdAsync(newWorth,coinId));
        }
    }
}
