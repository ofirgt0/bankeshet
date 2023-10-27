using FinancialSchool.Models.Dal;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FinancialSchool
{
    public class FinancialSchoolContext : DbContext
    {
        public FinancialSchoolContext(DbContextOptions<FinancialSchoolContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Coin> Coins { get; set; }
        public DbSet<HistoryLine> HistoryLines { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Product> Products { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Coin>().ToTable("Coins");
            modelBuilder.Entity<HistoryLine>().ToTable("HistoryLines");
            modelBuilder.Entity<Class>().ToTable("Classes");
            modelBuilder.Entity<Product>().ToTable("Products");

            modelBuilder.Entity<HistoryLine>()
                .Property(h => h.Id)
                .UseIdentityColumn()
                .Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Ignore);
        }
    }
}