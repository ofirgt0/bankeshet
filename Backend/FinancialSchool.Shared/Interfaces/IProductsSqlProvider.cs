using FinancialSchool.Shared.Models.Dal;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinancialSchool.Shared.Interfaces
{
    public interface IProductsSqlProvider
    {
        Task<IList<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(int ProductId);
        Task<bool> InsertProductAsync(Product newProduct);
        Task<bool> DeleteProductByIdAsync(int ProductId);
    }
}