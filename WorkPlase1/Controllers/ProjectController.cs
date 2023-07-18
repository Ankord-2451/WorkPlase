using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WorkPlase1.Core;
using WorkPlase1.Data;
using WorkPlase1.Models;

namespace WorkPlase1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {
        private ApplicationDbContext dbContext;

        public ProjectController(ApplicationDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpGet]
        public IEnumerable<ProjectModel> Get([FromBody] int IdOfEmployer)
        {
            return dbContext.Projects.Where(x => x.IDofEmployer == IdOfEmployer).ToArray();
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProjectModel project)
        {
            if (ModelState.IsValid)
            {
                var session = new SessionWorker(HttpContext);
                if (session.IsEmployer())
                {
                    project.IDofEmployer=session.GetUserId();
                    project.DateOfCreation=DateTime.Now;
                    dbContext.Projects.Add(project);
                    dbContext.SaveChanges();
                    return Ok(JsonSerializer.Serialize<string>("Was created new project"));
                }
                return Ok(JsonSerializer.Serialize<string>("you don't have enough permission to do so"));
            }
            return Ok(JsonSerializer.Serialize<string>("project isn't valid"));
        }

        [HttpPut]
        public IActionResult Put([FromBody] ProjectModel project)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    dbContext.Projects.Remove(dbContext.Projects.First(x => x.Id == project.Id));
                }
                catch
                {
                    return Ok(JsonSerializer.Serialize<string>("project wasn't found"));
                }
                dbContext.Projects.Add(project);
                dbContext.SaveChanges();
                return Ok(JsonSerializer.Serialize<string>("project was update"));
            }
            return Ok(JsonSerializer.Serialize<string>("project isn't valid"));
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] int Id)
        {
            try
            {
                dbContext.Projects.Remove(dbContext.Projects.First(x => x.Id == Id));
            }
            catch
            {
                return Ok(JsonSerializer.Serialize<string>("project wasn't found"));
            }
            return Ok(JsonSerializer.Serialize<string>("project was delete"));
        }
    }
}
