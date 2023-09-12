using Microsoft.EntityFrameworkCore;
using TaskAPI.Model;

namespace TaskAPI.DB
{
    public class TaskContext : DbContext
    {
        public TaskContext() 
        {
        
        }

        public TaskContext(DbContextOptions<TaskContext> options) 
            : base(options) 
        {
        }   

        public virtual DbSet<Task> Tasks { get; set; }
    }
}
