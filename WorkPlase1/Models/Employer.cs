using SQLite;
using System.ComponentModel.DataAnnotations;
using WorkPlase1.Interfaises;

namespace WorkPlase1.Models
{
    public class Employer :IUser
    {
        [Key]
        [AutoIncrement]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string login { get; set; }
        [Required]
        public string password { get; set; }

        public string? email { get; set; }
    }
}
