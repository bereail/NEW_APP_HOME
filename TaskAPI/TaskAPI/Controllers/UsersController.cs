using Microsoft.AspNetCore.Mvc;
using TaskAPI.Models;
using TaskAPI.Model.ModelDTO;
using System.Linq; // Asegúrate de incluir el espacio de nombres System.Linq
using TaskAPI.Model.DTO;


namespace TaskAPI.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : BaseController
    {
        public UsersController(TaskDBContext dbContext) : base(dbContext)
        {
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            try
            {
                var listUsers = _dbContext.Users
                    .Select(t => new UsersDTO { UserId = t.UserId, Name = t.Name, Email = t.Email, Role = t.Role, Dni = t.Dni })
                    .ToList();

                if (listUsers != null && listUsers.Any())
                {
                    return Ok(listUsers);
                }
                return NotFound("No users found in the database");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("users")]
        public IActionResult CreateUser(UsersDTO usersDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Users newUser = new Users
                    {
                        UserId = usersDTO.UserId,
                        Name = usersDTO.Name,
                        Email = usersDTO.Email,
                        Role = usersDTO.Role,
                        Dni = usersDTO.Dni
                    };

                    // Agregar el nuevo usuario a la base de datos
                    _dbContext.Users.Add(newUser);
                    _dbContext.SaveChanges();

                    return Ok("User created successfully");
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
        public IActionResult UpdateUser(int id, UsersDTO usersDTO) 
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var existingUser = _dbContext.Users.FirstOrDefault(t => t.UserId == id);

                    if (existingUser == null)
                    {
                        return NotFound("usuairo no encontrado en la base de datos");
                    }

                    existingUser.Name = usersDTO.Name;
                    existingUser.Email = usersDTO.Email;
                    existingUser.Role = usersDTO.Role;
                    existingUser.Dni = usersDTO.Dni;

                    _dbContext.SaveChanges();
                    return Ok("usuario actulizado correctamente");
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            { 
                return StatusCode(500, "Error interno dle servidor" + ex.Message);
            }
        }
    }
}
