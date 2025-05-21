using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Transaction_Service.Migrations
{
    public partial class AddedBalanceLogID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ID",
                table: "BalanceLogs",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BalanceLogs",
                table: "BalanceLogs",
                column: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_BalanceLogs",
                table: "BalanceLogs");

            migrationBuilder.DropColumn(
                name: "ID",
                table: "BalanceLogs");
        }
    }
}
