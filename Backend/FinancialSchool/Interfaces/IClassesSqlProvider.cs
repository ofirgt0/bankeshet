using FinancialSchool.Models.Dal;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FinancialSchool.Interfaces
{
    public interface IClassesSqlProvider
    {
        Task<IList<Class>> GetAllClassesAsync();
        Task<Class> GetClassByIdAsync(string classId);
        Task<bool> InsertClassAsync(Class newClass);
        Task UpdateCash(string classId, int diff);
    }
}
