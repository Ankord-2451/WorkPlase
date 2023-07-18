using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WorkPlase1.Core;
using WorkPlase1.Data;
using WorkPlase1.Models;

namespace WorkPlase1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WorkerController : Controller
    {
        private ApplicationDbContext dbContext;
        public WorkerController(ApplicationDbContext _dbContext)
        {
            dbContext = _dbContext;
        }
      
        [HttpGet]
        public IEnumerable<AccountModel> Get()
        {
            var session = new SessionWorker(HttpContext);
            if(session.IsEmployer()) { 
            return dbContext.Accounts.Where(x => x.IDofEmployer == session.GetUserId()).ToArray();
            }
            else
            {
                return dbContext.Accounts.Where(x => x.Id == session.GetUserId()).ToArray();
            }
        }
    }
}
