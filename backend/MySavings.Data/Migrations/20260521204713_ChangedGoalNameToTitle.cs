using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MySavings.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangedGoalNameToTitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "SavingGoals",
                newName: "Title");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "SavingGoals",
                newName: "Name");
        }
    }
}
