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

        [HttpGet("Authorization")]
        public ActionResult Index()
        {
            var session = new SessionWorker(HttpContext);
           
            if (session.IsAuthorized())
            {
                return RedirectToAction("counter");
            }
             return null;
        }

        [HttpPost("Authorization")]
        public ActionResult Index(string login,string password)
        {
            AccountModel account;
            
            var session = new SessionWorker(HttpContext);

          
           password = Encoder.Encode(configuration, password);

            try { 
            account = dbContext.Accounts.First(e => (e.login == login) && (e.password == password));
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

                return RedirectToAction(nameof(Index));
            } 
            
           
            return Index();
        }



        [HttpGet("LogOut")]
        public ActionResult LogOut()
        {
            var session = new SessionWorker(HttpContext);
            session.Clear();
            return RedirectToAction("Index","Home");
        }
    }
}
