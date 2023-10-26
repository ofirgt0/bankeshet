using System.ComponentModel.DataAnnotations;

namespace FinancialSchool.Shared.Models.Dal
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string PicturePath { get; set; }
        public int Amount { get; set; }
    }
}