using Microsoft.AspNetCore.Mvc;
using TaskAPI.Models;

namespace TaskAPI.Controllers
{
    public class BaseController : ControllerBase
    {
        protected readonly TaskDBContext _dbContext;

        public BaseController(TaskDBContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
