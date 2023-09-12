using Microsoft.AspNetCore.Mvc;

namespace TaskAPI.Controllers
{
    public class TaskAssignmentsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
