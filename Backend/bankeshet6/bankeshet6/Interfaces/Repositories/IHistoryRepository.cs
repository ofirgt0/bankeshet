using FinancialSchool.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Interfaces.Repositories
{
    public interface IHistoryRepository
    {
        Task<IList<HistoryLine>> GetAllHistoryAsync();
        Task<IList<HistoryLine>> GetHistoryLinesByClassIdAsync(string classId);
        Task<bool> InsertHistoryAsync(HistoryLine newHistoryLine);
        Task<bool> DeleteHistoryLineAsync(int lineId);
    }
}
