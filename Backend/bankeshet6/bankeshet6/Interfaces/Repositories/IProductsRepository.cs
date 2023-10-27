using FinancialSchool.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Interfaces.Repositories
{
    public interface IProductsRepository
    {
        Task<IList<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(int ProductId);
        Task<bool> InsertProductAsync(Product newProduct);
        Task<bool> DeleteProductByIdAsync(int ProductId);
    }
}
