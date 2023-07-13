using Microsoft.AspNetCore.Mvc;
using WorkPlase1.Core;
using WorkPlase1.Data;

namespace WorkPlase1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonalOfficeController : ControllerBase
    {
        private ApplicationDbContext dbContext;

        public PersonalOfficeController(ApplicationDbContext _dbContext) 
        {
            dbContext = _dbContext;
        }

        [HttpPut]
        public ActionResult LogOut()
        {
            var session = new SessionWorker(HttpContext);
            session.Clear();
            return RedirectToAction("Index","Home");
        }
    }
}
