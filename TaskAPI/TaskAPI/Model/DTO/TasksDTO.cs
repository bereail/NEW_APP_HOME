namespace TaskAPI.Model.ModelDTO
{
    public class TasksDTO
    {
        public int TaskId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? DueDate { get; set; }
    }
}
