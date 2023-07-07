using SQLite;
using System.ComponentModel.DataAnnotations;

namespace WorkPlase1.Models
{
    public class TaskModel
    {

        [Key, AutoIncrement]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public DateTime? DeadLine { get; set; }

        public int? IDofWorker { get; set; }

        public int ProgressInPercentage { get; set; }

        [Required]
        public int IDofProject { get; set; }

        public DateTime? DateOfCompletion { get; set; }

        public DateTime? DateOfStart { get; set; }

        public string? Comment { get; set; }
    }
}
