using Microsoft.EntityFrameworkCore;
using MySavings.Entities;

namespace MySavings.Data
{
    public class MySavingsDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<SavingGoal> SavingGoals { get; set; }
        public DbSet<Wallet> Wallets => Set<Wallet>();
        public DbSet<Deposit> Deposits { get; set; }

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
                o.Property(e => e.TargetDate).IsRequired();
                o.Property(e => e.Status).IsRequired();
                o.HasOne(e => e.User).WithMany(u => u.SavingGoals).HasForeignKey(e => e.UserId);
            });

            modelBuilder.Entity<Wallet>(entity =>
            {
                entity.ToTable("Wallets");
                entity.HasKey(w => w.Id);
                entity.Property(w => w.TotalBalance).HasColumnType("decimal(18,2)").IsRequired();
                entity.Property(w => w.CreatedAt).IsRequired();
                entity.Property(w => w.UpdatedAt).IsRequired();
                entity
                    .HasOne(w => w.User)
                    .WithOne()
                    .HasForeignKey<Wallet>(w => w.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Deposit>(o =>
            {
                o.ToTable("Deposits");
                o.HasKey(d => d.Id);
                o.Property(d => d.Amount).IsRequired().HasPrecision(18, 2);
                o.Property(d => d.Note);
                o.Property(d => d.CreatedAt).IsRequired();
                o.HasOne(d => d.SavingGoal)
                    .WithMany(g => g.Deposits)
                    .HasForeignKey(d => d.SavingGoalId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
