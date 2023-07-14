using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using WorkPlase1.Core;
using WorkPlase1.Data;
using WorkPlase1.Models;

namespace WorkPlase1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : ControllerBase
    {
        private ApplicationDbContext dbContext;
        public static IConfiguration configuration;

        public RegistrationController(ApplicationDbContext _dbContext, IConfiguration _configuration)
        {
            dbContext = _dbContext;      
            configuration = _configuration;
        }

        [HttpPost]
        public ActionResult Post([FromBody] AccountModel account)
        {
            if(ModelState.IsValid)
            {
                if(dbContext.Accounts.Where(x=>x.login == account.login).Any())
                {
                    return Ok(JsonSerializer.Serialize<string>("Login isn't available"));
                }
                account.password= Encoder.Encode(configuration, account.password);
                dbContext.Accounts.Add(account);
                dbContext.SaveChanges();
                return Ok(JsonSerializer.Serialize<string>("Was created new account"));
            }
            return Ok(JsonSerializer.Serialize<string>("Model isn't valid"));
        }
    }
}
