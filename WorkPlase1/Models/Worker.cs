using SQLite;
using System.ComponentModel.DataAnnotations;
using WorkPlase1.Interfaises;

namespace WorkPlase1.Models
{
    public class Worker : IUser
    {
        [Key]
        [AutoIncrement]
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string login { get; set; }
        [Required]
        public string password { get; set; }

        public string? email { get; set; }

        [Required]
        public string profession { get; set; }
        
        public int? IDofProject { get; set; }

        public int? IDofEmployer { get; set; }

        public int? HoursOfWork { get; set; }

        public int? PrisePerHour { get; set; }
    }
}
