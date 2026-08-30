using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MySavings.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSavingGoalStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "SavingGoals",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "SavingGoals");
        }
    }
}
