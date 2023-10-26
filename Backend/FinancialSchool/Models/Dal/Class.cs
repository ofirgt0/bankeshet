using System.ComponentModel.DataAnnotations;

namespace FinancialSchool.Models.Dal
{
    public class Class
    {
        [Key]
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public int TotalCash { get; set; }
        public string TeacherId { get; set; }
    }
}
