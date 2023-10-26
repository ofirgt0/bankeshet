using FinancialSchool.Models;
using FinancialSchool.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Interfaces.Repositories
{
    public interface IUsersRepository
    {
        Task<IList<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(string UserName);
        Task<bool> InsertUserAsync(User newUser);
        Task<bool> GetAuthAsync(string userName, string password);
        Task<bool> DeleteUserAsync(string userName);
        Task<ExistingEntities> GetExistingEntitiesAsync();
    }
}
