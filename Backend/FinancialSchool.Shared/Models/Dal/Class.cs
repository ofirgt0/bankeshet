using System.ComponentModel.DataAnnotations;

namespace FinancialSchool.Shared.Models.Dal
{
    public class Class
    {
        [Key]
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public int TotalCash { get; set; }
        public int TeacherId { get; set; }
    }
}
