using FinancialSchool.Shared.Models.Dal;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinancialSchool.Shared.Interfaces
{
    public interface ICoinsSqlProvider
    {
        Task<IList<Coin>> GetAllCoinsAsync();
        Task<Coin> GetCoinByIdAsync(string coinId);
        Task<bool> InsertCoinAsync(Coin newCoin);
        Task<bool> UpdateCoinWorthByIdAsync(int newWorth, string coinId);
    }
}