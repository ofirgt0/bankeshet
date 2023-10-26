using FinancialSchool.Interfaces;
using FinancialSchool.Interfaces.Repositories;
using FinancialSchool.Models;
using FinancialSchool.Models.Dal;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Repository
{
    public class UsersRepository : IUsersRepository
    {
        private readonly IUsersSqlProvider _usersSqlProvider;
        private readonly IClassesSqlProvider _classesSqlProvider;

        public UsersRepository(IUsersSqlProvider usersSqlProvider, IClassesSqlProvider classesSqlProvider)
        {
            _usersSqlProvider = usersSqlProvider;
            _classesSqlProvider = classesSqlProvider;
        }

        public async Task<bool> DeleteUserAsync(string userName)
        {
            return await _usersSqlProvider.DeleteUserAsync(userName);
        }

        public Task<IList<User>> GetAllUsersAsync()
        {
            return _usersSqlProvider.GetAllUsersAsync();
        }

        public Task<User> GetUserByIdAsync(string UserName)
        {
            return _usersSqlProvider.GetUserByIdAsync(UserName);
        }

        public async Task<bool> InsertUserAsync(User newUser)
        {
            return await _usersSqlProvider.InsertUserAsync(newUser);
        }

        public async Task<bool> GetAuthAsync(string userName, string password)
        {
            return await _usersSqlProvider.GetAuthAsync(userName, password);
        }

        public async Task<ExistingEntities> GetExistingEntitiesAsync()
        {
            var res = new ExistingEntities
            {
                Classes = new List<Class> { },
                Users = new List<UserQuery> { }
            };

            res.Classes = (await _classesSqlProvider.GetAllClassesAsync()).ToList();

            var users = await _usersSqlProvider.GetAllUsersAsync();
            users.ToList().ForEach(user => res.Users.Add(new UserQuery
            {
                Class = user.Class,
                DisplayName = user.DisplayName,
                Type = user.Type,
                UserName = user.UserName,
            }));

            return res;
        }
    }
}