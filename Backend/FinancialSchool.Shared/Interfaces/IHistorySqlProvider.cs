using FinancialSchool.Shared.Models.Dal;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinancialSchool.Shared.Interfaces
{
    public interface IHistorySqlProvider
    {
        Task<IList<HistoryLine>> GetAllHistoryAsync();
        Task<IList<HistoryLine>> GetHistoryLinesByClassIdAsync(string classId);
        Task<bool> InsertHistoryAsync(HistoryLine newHistoryLine);
    }
}