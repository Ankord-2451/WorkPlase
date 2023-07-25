using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WorkPlase1.Data;
using WorkPlase1.Models;

namespace WorkPlase1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReportsController : ControllerBase
    {
        private ApplicationDbContext dbContext;
        public ReportsController(ApplicationDbContext _dbContext)
        {
           dbContext = _dbContext;
        }
        [HttpGet("get/{IdOfTask}")]
        public IEnumerable<ReportModel> Get(int IdOfTask)
        {
            return dbContext.Reports.Where(x => x.IdOfTask== IdOfTask).ToArray();
        }
        [HttpPost]
        public IActionResult Post([FromBody] ReportModel report) 
        {
            for (int i = 60; i < report.Description.Length; i += 60)
            { 
            report.Description = report.Description.Insert(i, "\n");
            }
           report.Date = DateTime.Now;
           dbContext.Reports.Add(report);
           dbContext.SaveChanges();
           return Ok(JsonSerializer.Serialize<string>("Was create new report"));
        }
    }
}
