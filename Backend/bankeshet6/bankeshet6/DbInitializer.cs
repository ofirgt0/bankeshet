using FinancialSchool.Shared;
using FinancialSchool.Models.Dal;
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
                new User{Class="a1",DisplayName="רונית",Password="jjnj", Type="teacher", UserName = "ro213nit"},
                new User{Class="a2",DisplayName="רונeweית",Password="jjnj", Type="teacher", UserName = "ro23nit"},
                new User{Class="a3",DisplayName="רוwwנית",Password="jjnj", Type="teacher", UserName = "roni22t"},
            };
            foreach (User user in users)
            {
                context.Users.Add(user);
            }
            context.SaveChanges();
        }
    }
}
