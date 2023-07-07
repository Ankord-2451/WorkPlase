namespace WorkPlase1.Interfaises
{
    public interface IUser
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string login { get; set; }
        public string password { get; set; }

        public string email { get; set; }
    }
}
