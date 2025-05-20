using Microsoft.EntityFrameworkCore;
using System;
using Notification_Service.Models;

namespace Notification_Service.Database
{
    public class InstaDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<BalanceLog> BalanceLogs { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public InstaDbContext(DbContextOptions<InstaDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
