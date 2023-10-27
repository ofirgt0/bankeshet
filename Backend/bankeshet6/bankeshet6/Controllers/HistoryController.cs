using FinancialSchool.Interfaces.Repositories;
using FinancialSchool.Models.Dal;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Controllers
{
    [ApiController]
    [Route("api/History")]
    public class HistoryController : ControllerBase
    {
        private readonly IHistoryRepository _historyRepository;

        public HistoryController(IHistoryRepository historyRepository)
        {
            _historyRepository = historyRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllHistoryAsync()
        {
            return Ok(await _historyRepository.GetAllHistoryAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetHistoryLinesByClassIdAsync(string id)
        {
            return Ok(await _historyRepository.GetHistoryLinesByClassIdAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult> InsertHistoryAsync([FromBody] HistoryLine newHistoryLine)
        {
            return Ok(await _historyRepository.InsertHistoryAsync(newHistoryLine));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHistoryLineAsync(int id)
        {
            return Ok(await _historyRepository.DeleteHistoryLineAsync(id));
        }
    }
}