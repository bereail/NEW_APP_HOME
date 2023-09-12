using Microsoft.AspNetCore.Mvc;
using TaskAPI.Model.DTO;
using TaskAPI.Model.ModelDTO;
using TaskAPI.Models;

namespace TaskAPI.Controllers
{
    [ApiController]
    [Route("api/tasks")]

    public class TasksController : BaseController
    {

        public TasksController(TaskDBContext dbContext) : base(dbContext)
        {

        }
        [HttpGet]
        public IActionResult GetTasks()
        {
            try
            {
                var listTasks = _dbContext.Tasks
                    .Select(t => new TasksDTO { TaskId = t.TaskId, Name = t.Name, Description = t.Description, Status = t.Status, CreationDate = t.CreationDate, DueDate = t.DueDate })
                    .ToList();
                if (listTasks != null && listTasks.Any())
                {
                    return Ok(listTasks);
                }
                return NotFound("No tasks found in the database");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateTask(TasksDTO tasksDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Tasks newTask = new Tasks
                    {
                        TaskId = tasksDTO.TaskId,
                        Name = tasksDTO.Name,
                        Description = tasksDTO.Description,
                        Status = tasksDTO.Status,
                        CreationDate = DateTime.Now,
                        DueDate = DateTime.Now,
                    };
                    _dbContext.Tasks.Add(newTask);
                    _dbContext.SaveChanges();

                    return Ok("Task created successfully");
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, TasksDTO tasksDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    // Buscar la tarea en la base de datos por ID
                    var existingTask = _dbContext.Tasks.FirstOrDefault(t => t.TaskId == id);

                    if (existingTask == null)
                    {
                        return NotFound("Tarea no encontrada");
                    }

                    // Actualizar las propiedades de la tarea con los valores de tasksDTO
                    existingTask.Name = tasksDTO.Name;
                    existingTask.Description = tasksDTO.Description;
                    existingTask.Status = tasksDTO.Status;
                    existingTask.DueDate = tasksDTO.DueDate;

                    _dbContext.SaveChanges();

                    return Ok("Tarea actualizada correctamente");
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            try
            {
                var taskDelete = _dbContext.Tasks.FirstOrDefault(t => t.TaskId == id);

                if (taskDelete == null)
                {
                    return NotFound("Tarea no encontrada");
                }
                _dbContext.Tasks.Remove(taskDelete);
                _dbContext.SaveChanges();

                return Ok("Tarea eliminada correctamente");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }
    }
}