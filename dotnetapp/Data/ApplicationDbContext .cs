using SportsAcademyJobHiring.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


namespace SportsAcademyJobHiring.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<JobPosition> JobPositions { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
    }

}
