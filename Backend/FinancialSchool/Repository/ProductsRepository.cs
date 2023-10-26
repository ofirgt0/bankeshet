using FinancialSchool.Interfaces;
using FinancialSchool.Interfaces.Repositories;
using FinancialSchool.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Repository
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly IProductsSqlProvider _productsSqlProvider;

        public ProductsRepository(IProductsSqlProvider productsSqlProvider)
        {
            _productsSqlProvider = productsSqlProvider;
        }

        public Task<bool> DeleteProductByIdAsync(int ProductId)
        {
            return _productsSqlProvider.DeleteProductByIdAsync(ProductId);
        }

        public Task<IList<Product>> GetAllProductsAsync()
        {
            return _productsSqlProvider.GetAllProductsAsync();
        }

        public Task<Product> GetProductByIdAsync(int ProductId)
        {
            return _productsSqlProvider.GetProductByIdAsync(ProductId);
        }

        public Task<bool> InsertProductAsync(Product newProduct)
        {
            Random rnd = new Random();
            newProduct.Id = DateTime.Now.Second + rnd.Next(1, 999999999);
            return _productsSqlProvider.InsertProductAsync(newProduct);
        }
    }
}