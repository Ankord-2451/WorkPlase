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
            if(session.IsEmployer())
            {
                try {          
                    return dbContext.Accounts.Where(x => x.IDofEmployer == session.GetUserId()).ToArray();
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return dbContext.Accounts.Where(x => x.Id == session.GetUserId()).ToArray();
            }
        }

        [HttpGet("Project/{id}")]
        public IEnumerable<AccountModel> WorkersOfProject(int id)
        {
            var workers = new List<AccountModel>();
            var Tasks=dbContext.Tasks.Where(x => x.IDofProject == id).ToList();
            foreach (var task in Tasks)
            {
                if(task.IDofWorker != null) { 
                   workers.Add(dbContext.Accounts.First(x => x.Id == task.IDofWorker));
                }
            }
            return workers;
        }

        [HttpGet("byID/{id}")]
        public AccountModel WorkerByID(int id)
        {
            return dbContext.Accounts.First(x => x.Id == id);
        }
        [HttpPost("Prise/{id}")]
        public IActionResult PrisePerHoure(int id, [FromBody]int Prise)
        {
            var worker  = new AccountModel();
            try
            {
                worker = dbContext.Accounts.First(x => x.Id == id);
                worker.PrisePerHour = Prise;
            }
            catch
            {
                return Ok(JsonSerializer.Serialize<string>("Account wasn't found"));
            }

            dbContext.Accounts.Update(worker);
            dbContext.SaveChanges();
            return Ok(JsonSerializer.Serialize<string>("Prise per houre was update"));
        }


    }
}
