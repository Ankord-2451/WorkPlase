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
