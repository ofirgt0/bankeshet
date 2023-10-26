using FinancialSchool.Shared;
using FinancialSchool.Shared.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinancialSchool.Shared.Interfaces;

namespace FinancialSchool.Lib.SqlProviders
{
    public class ProductsSqlProvider : IProductsSqlProvider
    {
        private readonly FinancialSchoolContext _context;

        public ProductsSqlProvider(FinancialSchoolContext context)
        {
            _context = context;
        }

        public async Task<IList<Product>> GetAllProductsAsync()
        {
            return _context.Products.ToList();
        }

        public async Task<Product> GetProductByIdAsync(int ProductId)
        {
            return _context.Products.First(product => product.Id == ProductId);
        }

        public async Task<bool> InsertProductAsync(Product newProduct)
        {
            _context.Products.Add(newProduct);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteProductByIdAsync(int ProductId)
        {
            var productToRemove = _context.Products.First(product => product.Id == ProductId);
            _context.Products.Remove(productToRemove);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}