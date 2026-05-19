namespace MySavings.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        // assuminu kad passwordui bus naudojamas PBKDF2 encryption
        // kas darys autentifikacija gales pakeisti i kita buda
        // pats sito nenaudojau bet del to is destytojo gavau pastaba
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public int Iterations { get; set; }
        
    }
}