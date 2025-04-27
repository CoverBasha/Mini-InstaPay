using Microsoft.EntityFrameworkCore;
using System;
using UserService.Models;

namespace UserService.Database
{
    public class InstaDbContext : DbContext
    {
        public DbSet<User>? Users { get; set; }
        public DbSet<Transaction>? Transactions { get; set; }
        public DbSet<BalanceLog>? BalanceLogs { get; set; }
        public DbSet<Notification>? Notifications { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();

            optionsBuilder.UseSqlServer(configuration.GetConnectionString("Default"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
