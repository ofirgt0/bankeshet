using System.ComponentModel.DataAnnotations;

namespace FinancialSchool.Shared.Models.Dal
{
    public class History
    {
        [Key]
        public int Id { get; set; }
        public string Date { get; set; }
        public int ProductId { get; set; }
        public float TransactionPrice { get; set; }
        public string ClassId { get; set; }
    }
}
