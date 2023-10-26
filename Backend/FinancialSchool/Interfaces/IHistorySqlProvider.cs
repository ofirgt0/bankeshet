using FinancialSchool.Models.Dal;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinancialSchool.Interfaces
{
    public interface IHistorySqlProvider
    {
        Task<IList<HistoryLine>> GetAllHistoryAsync();
        Task<IList<HistoryLine>> GetHistoryLinesByClassIdAsync(string classId);
        Task<bool> InsertHistoryAsync(HistoryLine newHistoryLine);
        Task<bool> DeleteHistoryLine(int lineId);
    }
}