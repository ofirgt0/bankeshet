using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialSchool.Models.Dal
{
    public class HistoryLine
    {
        [Key]
        public int Id { get; set; }
        public string Date { get; set; }
        public string ProductId { get; set; }
        public string ProductTitle { get; set; }
        public double TransactionPrice { get; set; }
        public string ClassId { get; set; }
    }
}
