using FinancialSchool.Interfaces;
using FinancialSchool.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialSchool.SqlProviders
{
    public class HistorySqlProvider : IHistorySqlProvider
    {
        private readonly FinancialSchoolContext _context;

        public HistorySqlProvider(FinancialSchoolContext context)
        {
            _context = context;
        }

        public async Task<IList<HistoryLine>> GetAllHistoryAsync()
        {
            return _context.HistoryLines.ToList(); 
        }

        public async Task<IList<HistoryLine>> GetHistoryLinesByClassIdAsync(string classId)
        {
            var classHistory = _context.HistoryLines.Where(history => history.ClassId == classId).ToList();
            return classHistory;
        }

        public async Task<bool> InsertHistoryAsync(HistoryLine newHistoryLine)
        {
            _context.HistoryLines.Add(newHistoryLine);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteHistoryLine(int lineId)
        {
            var lineToRemove = _context.HistoryLines.FirstOrDefault(line => line.Id == lineId);
            _context.HistoryLines.Remove(lineToRemove);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}