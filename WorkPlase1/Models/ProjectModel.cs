using SQLite;
using System.ComponentModel.DataAnnotations;

namespace WorkPlase1.Models
{
    public class ProjectModel
    {

        [Key]
        [AutoIncrement]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public DateTime DateOfCreation { get; set; }

        public int IDofEmployer { get; set; }

        public bool ExistAllTasks { get; set; }
    }
}
