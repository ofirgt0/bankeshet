using FinancialSchool.Models.Dal;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinancialSchool.Interfaces
{
    public interface IUsersSqlProvider
    {
        Task<IList<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(string UserName);
        Task<bool> InsertUserAsync(User newUser);
        Task<bool> GetAuthAsync(string userName, string password);
        Task<bool> DeleteUserAsync(string userName);
    }
}