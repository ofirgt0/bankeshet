using FinancialSchool.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Interfaces.Repositories
{
    public interface ICoinsRepository
    {
        Task<IList<Coin>> GetAllCoinsAsync();
        Task<Coin> GetCoinByIdAsync(string coinId);
        Task<bool> InsertCoinAsync(Coin newCoin);
        Task<bool> UpdateCoinWorthByIdAsync(int newWorth, string coinId);
    }
}
