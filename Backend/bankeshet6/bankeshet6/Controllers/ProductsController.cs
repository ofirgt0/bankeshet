using FinancialSchool.Interfaces.Repositories;
using FinancialSchool.Models.Dal;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace FinancialSchool.Controllers
{
    [ApiController]
    [Route("api/Products")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsRepository _productsRepository;

        public ProductsController(IProductsRepository productsRepository)
        {
            _productsRepository = productsRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetProductsGetAllProductsAsync()
        {
            return Ok( _productsRepository.GetAllProductsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetProductAsync(int id)
        {
            return Ok(await _productsRepository.GetProductByIdAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult> InsertProductAsync([FromBody] Product newProduct)
        {   
            return Ok(await _productsRepository.InsertProductAsync(newProduct));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProductByIdAsync(int id)
        {
            return Ok(await _productsRepository.DeleteProductByIdAsync(id));
        }
    }
}