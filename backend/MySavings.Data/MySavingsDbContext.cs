
using Microsoft.EntityFrameworkCore;
using MySavings.Entities;

namespace MySavings.Data
{
    public class MySavingsDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public MySavingsDbContext(DbContextOptions<MySavingsDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); 
            
            modelBuilder.Entity<User>(o =>
            {
                o.HasKey(e => e.Id);
                o.Property(e => e.UserName).IsRequired();
                o.Property(e => e.Email).IsRequired();
                o.Property(e => e.PasswordHash).IsRequired();
                o.Property(e => e.PasswordSalt).IsRequired();
                o.Property(e => e.Iterations).IsRequired();
            });
        }

    }
}