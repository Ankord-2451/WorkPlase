using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using WorkPlase1.Models;

namespace WorkPlase1.Core
{
    public class GeneratorJWTTokens
    {
        public static IConfiguration configuration { get; set; }

        public GeneratorJWTTokens(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        public string GenerateJWTToken(AccountModel employee)
        {
            var Tokenhendler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(configuration["JWT:key"]);
            var descriptor = new SecurityTokenDescriptor
            {
               Claims= new Dictionary<string, object>
               {
                   {"Role",employee.role},
                   {"ID",employee.Id.ToString()}
               },
                Audience = employee.Id.ToString(),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = Tokenhendler.CreateToken(descriptor);
            return Tokenhendler.WriteToken(token);
        }

    }
}
