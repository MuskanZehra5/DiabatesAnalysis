using Microsoft.EntityFrameworkCore;
using SharedModels.Models;

namespace PatientService.Models
{
    public class PatientDbContext : DbContext
    {
        public PatientDbContext(DbContextOptions<PatientDbContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Patient>().HasData(
                new Patient { Id = 1, FirstName = "John", Surname = "Doe", Email = "john@example.com", Phone = "1234567890", DateOfBirth = new DateTime(1990, 1, 1) },
                new Patient { Id = 2, FirstName = "Jane", Surname = "Smith", Email = "jane@example.com", Phone = "9876543210", DateOfBirth = new DateTime(1992, 5, 10) }
            );
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // Replace with your actual connection string
                optionsBuilder.UseSqlServer("Server=localhost,1433;Database=PatientServiceDb;User Id=sa;Password=YourStrong!Passw0rd;");
            }
        }
    }
}
