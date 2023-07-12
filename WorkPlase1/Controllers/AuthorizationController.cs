using Microsoft.AspNetCore.Mvc;
using WorkPlase1.Core;
using WorkPlase1.Data;
using WorkPlase1.Models;

namespace WorkPlase1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorizationController : ControllerBase
    {

        private ApplicationDbContext dbContext;
        public static IConfiguration configuration;

        public AuthorizationController(ApplicationDbContext _dbContext, IConfiguration _configuration)
        {
            dbContext = _dbContext;
            configuration = _configuration;
        }

        [HttpGet]
        public void Get()
        {
            var session = new SessionWorker(HttpContext);
           
            if (session.IsAuthorized())
            {
               
            }
           
        }

        [HttpPost]
        public ActionResult Post([FromBody] Log log)
        {
            AccountModel account;

            
            var session = new SessionWorker(HttpContext);


            log.password = Encoder.Encode(configuration, log.password);

            try { 
            account = dbContext.Accounts.First(e => (e.login == log.login) && (e.password == log.password));
            }
            catch
            {
                account = null;
            }

            if(account != null) 
            {
                //Set in session JWT Token for Authorization
                var Geterator = new GeneratorJWTTokens(configuration);
                var token = Geterator.GenerateJWTToken(account);
                
                session.SaveToken(token);
                //Set in session object type of AuthUserModel for Authentication
                session.SaveUserModel(new AuthUserModel()
                { 
                    ID = account.Id,
                    name = account.Name,
                    role = account.role 
                });

                return Ok(new { message = "Loged successfully." }); ;
            }


            return Ok(new { message = "Form data received successfully." });
        }



        [HttpGet("LogOut")]
        public ActionResult LogOut()
        {
            var session = new SessionWorker(HttpContext);
            session.Clear();
            return RedirectToAction("Index","Home");
        }
    }
    public class Log
    {
        public string login { get; set; }
        public string password { get; set; }
    }
}
