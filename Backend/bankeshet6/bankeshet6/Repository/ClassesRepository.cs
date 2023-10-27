using FinancialSchool.Interfaces;
using FinancialSchool.Interfaces.Repositories;
using FinancialSchool.Models;
using FinancialSchool.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Repository
{
    public class ClassesRepository : IClassesRepository
    {
        private readonly IClassesSqlProvider _classesSqlProvider;
        private readonly IUsersRepository _usersRepository;
        private readonly IProductsRepository _productsRepository;
        private readonly IHistoryRepository _historyRepository;

        public ClassesRepository(IUsersRepository usersRepository, IHistoryRepository historyRepository, IClassesSqlProvider classesSqlProvider, IProductsRepository productsRepository)
        {
            _classesSqlProvider = classesSqlProvider;
            _productsRepository = productsRepository;
            _historyRepository = historyRepository;
            _usersRepository = usersRepository;
        }

        public async Task<IList<ClassesRequest>> GetAllClassesAsync()
        {
            var users = await _usersRepository.GetAllUsersAsync();
            var result = new List<ClassesRequest>();
            (await _classesSqlProvider.GetAllClassesAsync()).ToList().ForEach(cls =>
            {
                result.Add(new ClassesRequest
                {
                    DisplayName=cls.DisplayName,
                    Id=cls.Id,
                    TeacherDisplayName = users.FirstOrDefault(user => user.Class == cls.Id)?.DisplayName,
                    TeacherId = cls.TeacherId,
                    TotalCash = cls.TotalCash,
                });
            });

            return result;
        }

        public async Task<Class> GetClassByIdAsync(string classId)
        {
            return await _classesSqlProvider.GetClassByIdAsync(classId);
        }

        public async Task<bool> InsertClassAsync(Class newClass)
        {
            return await _classesSqlProvider.InsertClassAsync(newClass);
        }

        public async Task<bool> BuyProduct(string classId, int productId)
        {
            Random rnd = new Random();
            var product = await _productsRepository.GetProductByIdAsync(productId);
            var classToUpdate = await _classesSqlProvider.GetClassByIdAsync(classId);
            if (classToUpdate.TotalCash < product.Price) return false;
            await _classesSqlProvider.UpdateCash(classId, (-1)*product.Price);
            var newLine = new HistoryLine
            {
                ClassId = classId,
                Date = DateTime.Now.ToString(),
                //Id = classId + DateTime.Now.Second + rnd.Next(1, 999999999),
                ProductId = "" + product.Id,
                ProductTitle = product.Title,
                TransactionPrice = (-1) * product.Price,
            };
            await _historyRepository.InsertHistoryAsync(newLine);
            return true;
        }

        public async Task<bool> UpdateCurrency(UpdateCurrencyRequest request)
        {
            Random rnd = new Random();
            await _classesSqlProvider.UpdateCash(request.ClassId, request.Amount);
            var newLine = new HistoryLine
            {
                ClassId = request.ClassId,
                Date = DateTime.Now.ToString(),
                //Id = request.ClassId + DateTime.Now.Second + rnd.Next(1, 999999999),
                ProductId = request.Desctiption +"" + rnd.Next(1, 999999999),
                ProductTitle = request.Title,
                TransactionPrice = request.Amount,
            };
            await _historyRepository.InsertHistoryAsync(newLine);
            return true;
        }
    }
}
