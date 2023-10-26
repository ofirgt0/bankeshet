using FinancialSchool.Shared;
using FinancialSchool.Shared.Models.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FinancialSchool.Shared
{
    class DbInitializer
    {
        public static void Initialize(FinancialSchoolContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            var users = new User[]
            {
                new User{Class="a1",DisplayName="רונית",Password="jjnj", Type="teacher", UserName = "ronit"},
                new User{Class="a1",DisplayName="רונית",Password="jjnj", Type="teacher", UserName = "ronit"},
                new User{Class="a1",DisplayName="רונית",Password="jjnj", Type="teacher", UserName = "ronit"},
            };
            foreach (User user in users)
            {
                context.Users.Add(user);
            }
            context.SaveChanges();
        }
    }
}
