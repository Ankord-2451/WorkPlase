using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WorkPlase1.Data;
using WorkPlase1.Models;

namespace WorkPlase1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : ControllerBase
    {
        private ApplicationDbContext dbContext;

        public RegistrationController(ApplicationDbContext _dbContext)
        {
            dbContext = _dbContext;          
        }

        [HttpPost]
        public ActionResult Post([FromBody] AccountModel account)
        {
            if(ModelState.IsValid)
            {
                if(dbContext.Accounts.Where(x=>x.login == account.login).Any())
                {
                    return Ok("Login isn't available");
                }
                dbContext.Accounts.Add(account);
                dbContext.SaveChanges();
                return Ok("Was created new account");
            }
            return Ok("Model isn't valid");
        }
    }
}
