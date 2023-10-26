using FinancialSchool.Shared;
using FinancialSchool.Shared.Interfaces;
using FinancialSchool.Shared.Models.Dal;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Lib.SqlProviders
{
    public class ClassesSqlProvider : IClassesSqlProvider
    {
        private readonly FinancialSchoolContext _context;

        public ClassesSqlProvider(FinancialSchoolContext context)
        {
            _context = context;
        }

        public async Task<IList<Class>> GetAllClassesAsync()
        {
            return _context.Classes.ToList();
        }

        public async Task<Class> GetClassByIdAsync(string classId)
        {
            return _context.Classes.First(iterateClass => iterateClass.Id == classId);
        }

        public async Task<bool> InsertClassAsync(Class newClass)
        {
            _context.Classes.Add(newClass);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}