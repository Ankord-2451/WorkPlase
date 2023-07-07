using System.Security.Cryptography;
using System.Text;
using WorkPlase1.Models;

namespace WorkPlase1.Core
{
    public static class Encoder
    {
       public static void EncodeEmployee(IConfiguration config,AccountModel employee)
        { 
        SHA256 hm = SHA256.Create();
            //Hash password
        byte[] result = hm.ComputeHash(Encoding.UTF8.GetBytes(employee.password));

            employee.password = BitConverter.ToString(result).Replace("-", "") + $"{config["Encoder:SecurityKey"]}";
            //Hash login
        result = hm.ComputeHash(Encoding.UTF8.GetBytes(employee.login));
           
            employee.login = BitConverter.ToString(result).Replace("-", "") + $"{config["Encoder:SecurityKey"]}";
        }

        public static string Encode(IConfiguration config,string str)
        {
            SHA256 hm = SHA256.Create();
            
            byte[] result = hm.ComputeHash(Encoding.UTF8.GetBytes(str));
            return BitConverter.ToString(result).Replace("-", "") + $"{config["Encoder:SecurityKey"]}";
        }

    }
}
