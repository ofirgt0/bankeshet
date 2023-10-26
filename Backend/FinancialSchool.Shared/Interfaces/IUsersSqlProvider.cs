using FinancialSchool.Shared.Models.Dal;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinancialSchool.Shared.Interfaces
{
    public interface IUsersSqlProvider
    {
        Task<IList<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(string UserName);
        Task<bool> InsertUserAsync(User newUser);
    }
}