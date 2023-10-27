using System.ComponentModel.DataAnnotations;

namespace FinancialSchool.Models.Dal
{
    public class Coin
    {
        [Key]
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string PicturePath { get; set; }
        public int Worth { get; set; }
    }
}
