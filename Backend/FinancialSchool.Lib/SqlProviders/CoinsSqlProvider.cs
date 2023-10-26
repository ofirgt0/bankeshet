using FinancialSchool.Shared;
using FinancialSchool.Shared.Interfaces;
using FinancialSchool.Shared.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialSchool.Lib.SqlProviders
{
    public class CoinsSqlProvider : ICoinsSqlProvider
    {
        private readonly FinancialSchoolContext _context;

        public CoinsSqlProvider(FinancialSchoolContext context)
        {
            _context = context;
        }

        public async Task<IList<Coin>> GetAllCoinsAsync()
        {
            return _context.Coins.ToList();
        }

        public async Task<Coin> GetCoinByIdAsync(string coinId)
        {
            return _context.Coins.First(coin => coin.Id == coinId);
        }

        public async Task<bool> InsertCoinAsync(Coin newCoin)
        {
            _context.Coins.Add(newCoin);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateCoinWorthByIdAsync(int newWorth, string coinId)
        {
            _context.Coins.First(coin => coin.Id == coinId).Worth = newWorth;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}