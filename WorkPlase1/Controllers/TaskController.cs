using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WorkPlase1.Core;
using WorkPlase1.Data;
using WorkPlase1.Models;

namespace WorkPlase1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private ApplicationDbContext dbContext;
        public TaskController (ApplicationDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpGet]
        public IEnumerable<TaskModel> Get([FromForm]int IdOfPoject)
        {
            return dbContext.Tasks.Where(x=>x.IDofProject== IdOfPoject).ToArray();
        }

        [HttpGet("One/{id?}")]
        public IEnumerable<TaskModel> GetOne(int id)
        {
            return dbContext.Tasks.Where(x => x.Id == id).ToArray();
        }

        [HttpPost]
        public IActionResult Post([FromBody]TaskModel task)
        {
            if (ModelState.IsValid)
            {
                if (task.IDofWorker != null)
                {
                    task.DateOfStart=DateTime.Now;
                }
                dbContext.Tasks.Add(task);
                dbContext.SaveChanges();
                return Ok(JsonSerializer.Serialize<string>("Was created new Task"));
            }
            return Ok(JsonSerializer.Serialize<string>("Task isn't valid"));
        }

        [HttpPut]
        public IActionResult Put([FromBody] TaskModel task)
        {
            if (ModelState.IsValid)
            {
                var session = new SessionWorker(HttpContext);
                if (session.IsEmployer())
                {
                    if(dbContext.Tasks.First(x => x.Id == task.Id).IDofWorker != task.IDofWorker)
                    {
                        task.DateOfStart = DateTime.Now;
                    }
                    if(task.IDofWorker == 0)
                    {
                        task.DateOfStart = null;
                    }
                    
                 try { 
                dbContext.Tasks.Remove(dbContext.Tasks.First(x=>x.Id==task.Id));
                }
                catch {
                    return Ok(JsonSerializer.Serialize<string>("Task wasn't found"));
                }
                  
                 dbContext.Tasks.Add(task);
                 dbContext.SaveChanges();
                 return Ok(JsonSerializer.Serialize<string>("Task was update")); 
                }
                return Ok(JsonSerializer.Serialize<string>("you don't have enough permission to do so"));
            }
            return Ok(JsonSerializer.Serialize<string>("Task isn't valid"));
        }

        [HttpPut("Percent/{id}")]
        public IActionResult PutProcent(int id,[FromBody] int Percent)
        {
                var session = new SessionWorker(HttpContext);
                    var task = new TaskModel();
                    try
                    {
                        task = dbContext.Tasks.First(x => x.Id == id);
                        task.ProgressInPercentage = Percent;
                        if (Percent == 100)
                        {
                            task.DateOfCompletion = DateTime.Now;
                        }
                    }
                    catch
                    {
                        return Ok(JsonSerializer.Serialize<string>("Task wasn't found"));
                    }

                    dbContext.Tasks.Update(task);
                    dbContext.SaveChanges();
                    return Ok(JsonSerializer.Serialize<string>("Task was update"));
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]int Id)
        {
            var session = new SessionWorker(HttpContext);
            if (session.IsEmployer())
            {
                try
                {
                    dbContext.Tasks.Remove(dbContext.Tasks.First(x => x.Id == Id));
                    dbContext.SaveChanges();
                }
                catch
                {
                    return Ok(JsonSerializer.Serialize<string>("Task wasn't found"));
                }
                return Ok(JsonSerializer.Serialize<string>("Task was delete"));
            }
            return Ok(JsonSerializer.Serialize<string>("you don't have enough permission to do so"));
        }
    }
}
