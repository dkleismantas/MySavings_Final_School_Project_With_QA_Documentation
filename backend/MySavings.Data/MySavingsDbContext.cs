
using Microsoft.EntityFrameworkCore;
using MySavings.Entities;

namespace MySavings.Data
{
    public class MySavingsDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<SavingGoal> SavingGoals { get; set; }
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
            });


            modelBuilder.Entity<SavingGoal>(o =>
                {
                    o.HasKey(e => e.Id);
                    o.Property(e => e.Name).IsRequired();
                    o.Property(e => e.TargetAmount).HasPrecision(18, 2).IsRequired();
                    o.Property(e => e.CurrentAmount).HasPrecision(18, 2).IsRequired();
                    o.HasOne(e => e.User)
                            .WithMany(u => u.SavingGoals)
                            .HasForeignKey(e => e.UserId);
                });
        }
    }
}