using SQLite;
using System.ComponentModel.DataAnnotations;

namespace WorkPlase1.Models
{
    public class ReportModel
    {
        [Key]
        [AutoIncrement]
        public int Id { get; set; }
        public int IdOfTask { get; set; }
        public DateTime Date { get; set; }

        [Required]
        public string Description { get; set; } 
    }
    
}
