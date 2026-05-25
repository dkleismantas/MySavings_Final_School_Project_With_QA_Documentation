using Microsoft.EntityFrameworkCore;
using MySavings.Entities;

namespace MySavings.Data
{
    public class MySavingsDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<SavingGoal> SavingGoals { get; set; }

        public MySavingsDbContext(DbContextOptions<MySavingsDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(o =>
            {
                o.HasKey(e => e.Id);
                o.HasIndex(e => e.UserName).IsUnique();
                o.HasIndex(e => e.Email).IsUnique();
                o.Property(e => e.PasswordHash).IsRequired();
                o.Property(e => e.Role).IsRequired();
            });

            modelBuilder.Entity<SavingGoal>(o =>
            {
                o.HasKey(e => e.Id);

                o.Property(e => e.Title).IsRequired();
                o.Property(e => e.TargetAmount).HasPrecision(18, 2).IsRequired();
                o.Property(e => e.CurrentAmount).HasPrecision(18, 2).IsRequired();
                o.Property(e => e.TargetDate).IsRequired(false);
                o.Property(e => e.Status).HasConversion<string>().IsRequired();
                o.Property(e => e.CreatedAt).IsRequired();
                o.Property(e => e.UpdatedAt).IsRequired();

                o.HasOne(e => e.User)
                    .WithMany(u => u.SavingGoals)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
                ;
            });
        }

        // Overrides SaveChanges to automatically handle audit fields for SavingGoal entity.
        // When a new SavingGoal is added, it sets CreatedAt and UpdatedAt to current UTC time.
        // When an existing SavingGoal is modified, it updates only the UpdatedAt field.
        // This ensures consistent timestamp tracking without requiring manual handling in business logic.
        public override int SaveChanges()
        {
            var entries = ChangeTracker.Entries<SavingGoal>();

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }

                if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }

            return base.SaveChanges();
        }
    }
}
