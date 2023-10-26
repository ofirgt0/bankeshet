

using FinancialSchool.Shared;
using FinancialSchool.Shared.Interfaces;
using FinancialSchool.Shared.Models.Dal;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Lib.SqlProviders
{
    public class UsersSqlProvider : IUsersSqlProvider
    {
        private readonly FinancialSchoolContext _context;

        public UsersSqlProvider(FinancialSchoolContext context)
        {
            _context = context;
        }

        public async Task<IList<User>> GetAllUsersAsync()
        {
            return _context.Users.ToList();
        }

        public async Task<User> GetUserByIdAsync(string UserName)
        {
            return _context.Users.First(user => user.UserName == UserName);
        }

        public async Task<bool> InsertUserAsync(User newUser)
        {
            _context.Users.Add(newUser);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}