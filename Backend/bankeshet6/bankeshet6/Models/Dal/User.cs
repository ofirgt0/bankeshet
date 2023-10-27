using System.ComponentModel.DataAnnotations;

namespace FinancialSchool.Models.Dal
{
    public class User
    {
        [Key]
        public string UserName { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string Class { get; set; }
        public string Type { get; set; }
    }
}
