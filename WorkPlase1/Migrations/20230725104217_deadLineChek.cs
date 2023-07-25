using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkPlase1.Migrations
{
    /// <inheritdoc />
    public partial class deadLineChek : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "deadLineChek",
                table: "Tasks",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "deadLineChek",
                table: "Tasks");
        }
    }
}
