using SQLite;
using System.ComponentModel.DataAnnotations;

namespace WorkPlase1.Models
{
    public enum Role
    {
        Worker,
        Employer
    }
    public class AccountModel
    {
        [Key]
        [AutoIncrement]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public Role role { get; set; }
        [Required]
        [MinLength(8)]
        public string login { get; set; }
        [Required]
        [MinLength(8)]
        public string password { get; set; }

        public string? email { get; set; }

        [Required]
        public string profession { get; set; }

        public int? IDofEmployer { get; set; }

        public int? HoursOfWork { get; set; }

        public int? PrisePerHour { get; set; }
    }
}
