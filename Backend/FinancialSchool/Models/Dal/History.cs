using System.ComponentModel.DataAnnotations;

namespace FinancialSchool.Models.Dal
{
    public class History
    {
        [Key]
        public int Id { get; set; }
        public string Date { get; set; }
        public int ProductId { get; set; }
        public double TransactionPrice { get; set; }
        public string ClassId { get; set; }
    }
}
