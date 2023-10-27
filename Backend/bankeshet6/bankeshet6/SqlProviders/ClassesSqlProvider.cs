using FinancialSchool.Interfaces;
using FinancialSchool.Models.Dal;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.SqlProviders
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
            //var toRemove = _context.Classes.FirstOrDefault(c => c.Id == "a1");
            //_context.Classes.Remove(toRemove);
            //_context.SaveChanges();
            return _context.Classes.ToList();
        }

        public async Task<Class> GetClassByIdAsync(string classId)
        {
            return _context.Classes.FirstOrDefault(iterateClass => iterateClass.Id == classId);
        }

        public async Task<bool> InsertClassAsync(Class newClass)
        {
            if (_context.Classes.Any(cls => cls.Id == newClass.Id))
                return false;
            _context.Classes.Add(newClass);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task UpdateCash(string classId, int diff)
        {
            var classToUpdate = _context.Classes.FirstOrDefault(c => c.Id == classId);
            if (classToUpdate != null)
            {

                classToUpdate.TotalCash += diff;
                await _context.SaveChangesAsync();
            }
        }
    }
}