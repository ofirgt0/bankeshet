using FinancialSchool.Shared;
using FinancialSchool.Shared.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinancialSchool.Shared.Interfaces;

namespace FinancialSchool.Lib.SqlProviders
{
    public class HistorySqlProvider : IHistorySqlProvider
    {
        private readonly FinancialSchoolContext _context;

        public HistorySqlProvider(FinancialSchoolContext context)
        {
            _context = context;
        }

        public async Task<IList<History>> GetAllHistoryAsync()
        {
            return _context.History.ToList();
        }

        public async Task<IList<History>> GetHistoryLinesByClassIdAsync(string classId)
        {
            return _context.History.Where(history => history.ClassId == classId).ToList();
        }

        public async Task<bool> InsertHistoryAsync(History newHistoryLine)
        {
            _context.History.Add(newHistoryLine);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}