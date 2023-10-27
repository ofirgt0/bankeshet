
namespace FinancialSchool.Models
{
    public class UpdateCurrencyRequest
    {
        public string ClassId { get; set; }
        public int Amount { get; set; }
        public string Title { get; set; }
        public string Desctiption { get; set; }
    }
}
