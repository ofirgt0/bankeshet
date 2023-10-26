using FinancialSchool.Models.Dal;
using System.Collections.Generic;

namespace FinancialSchool.Models
{
    public class ExistingEntities
    {
        public List<UserQuery> Users { get; set; }
        public List<Class> Classes { get; set; }
    }
}
