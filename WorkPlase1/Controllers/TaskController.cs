using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
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
        public IEnumerable<TaskModel> Get([FromBody]int IdOfPoject)
        {
            return dbContext.Tasks.Where(x=>x.IDofProject== IdOfPoject).ToArray();
        }

        [HttpPost]
        public IActionResult Post([FromBody]TaskModel task)
        {
            if (ModelState.IsValid)
            {
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
            return Ok(JsonSerializer.Serialize<string>("Task isn't valid"));
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]int Id)
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
    }
}
