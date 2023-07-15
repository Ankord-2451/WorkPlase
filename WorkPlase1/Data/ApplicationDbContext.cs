using Microsoft.EntityFrameworkCore;
using WorkPlase1.Models;

namespace WorkPlase1.Data
{
    public class ApplicationDbContext : DbContext
    {
       
        public DbSet<AccountModel> Accounts { get; set; } = null!;
        public DbSet<ProjectModel> Projects { get; set; } = null!;
        public DbSet<TaskModel> Tasks { get; set; } = null!;
        public DbSet<ReportModel> Reports { get; set; } = null!;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
           
        }
    }
}
