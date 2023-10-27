using FinancialSchool.Interfaces.Repositories;
using FinancialSchool.Models.Dal;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FinancialSchool.Controllers
{
    [ApiController]
    [Route("api/Users")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;

        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }
        
        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            return Ok(_usersRepository.GetAllUsersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUser(string id)
        {
            var res = await _usersRepository.GetUserByIdAsync(id);
            return Ok(res);
        }

        [HttpPost]
        public async Task<ActionResult> AddNewUser([FromBody] User newUser)
        {
            return Ok(await _usersRepository.InsertUserAsync(newUser));
        }

        [HttpGet("Auth/{userName}/{password}")]
        public async Task<ActionResult> GetAuthAsync(string userName, string password)
        {
            return Ok(await _usersRepository.GetAuthAsync(userName, password));
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteUserAsync(string UserId)
        {
            return Ok(await _usersRepository.DeleteUserAsync(UserId));
        }

        [HttpGet("Validation")]
        public async Task<ActionResult> GetExistingEntitiesAsync()
        {
            return Ok(await _usersRepository.GetExistingEntitiesAsync());
        }
    }
}