using FinancialSchool.Interfaces;
using FinancialSchool.Interfaces.Repositories;
using FinancialSchool.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Repository
{
    public class HistoryRepository : IHistoryRepository
    {
        private readonly IHistorySqlProvider _historySqlProvider;

        public HistoryRepository(IHistorySqlProvider historySqlProvider) {
            _historySqlProvider = historySqlProvider;
        }

        public async Task<IList<HistoryLine>> GetAllHistoryAsync()
        {
            return await _historySqlProvider.GetAllHistoryAsync();
        }

        public async Task<IList<HistoryLine>> GetHistoryLinesByClassIdAsync(string classId)
        {
            return await _historySqlProvider.GetHistoryLinesByClassIdAsync(classId);
        }

        public async Task<bool> InsertHistoryAsync(HistoryLine newHistoryLine)
        {

            newHistoryLine = new HistoryLine
            {
                ClassId = newHistoryLine.ClassId,
                Date = newHistoryLine.Date,
                ProductId = newHistoryLine.ProductId,
                ProductTitle = newHistoryLine.ProductTitle,
                TransactionPrice = newHistoryLine.TransactionPrice,
            };
            return await _historySqlProvider.InsertHistoryAsync(newHistoryLine);
        }

        public async Task<bool> DeleteHistoryLineAsync(int lineId)
        {
            return await _historySqlProvider.DeleteHistoryLine(lineId);
        }
    }
}
