using FinancialSchool.Interfaces;
using FinancialSchool.Interfaces.Repositories;
using FinancialSchool.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Repository
{
    public class CoinsRepository : ICoinsRepository
    {
        private readonly ICoinsSqlProvider _coinsSqlProvider;

        public CoinsRepository(ICoinsSqlProvider coinsSqlProvider)
        {
            _coinsSqlProvider = coinsSqlProvider;
        }
        public async Task<IList<Coin>> GetAllCoinsAsync()
        {
            return await _coinsSqlProvider.GetAllCoinsAsync();
        }

        public async Task<Coin> GetCoinByIdAsync(string coinId)
        {
            return await _coinsSqlProvider.GetCoinByIdAsync(coinId);
        }

        public async Task<bool> InsertCoinAsync(Coin newCoin)
        {
            return await _coinsSqlProvider.InsertCoinAsync(newCoin);
        }

        public async Task<bool> UpdateCoinWorthByIdAsync(int newWorth, string coinId)
        {
            return await _coinsSqlProvider.UpdateCoinWorthByIdAsync(newWorth, coinId);
        }
    }
}
