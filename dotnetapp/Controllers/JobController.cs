using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsAcademyJobHiring.Data;
using SportsAcademyJobHiring.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportsAcademyJobHiring.Controllers
{
    [Route("api/job")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly ApplicationDbContext _context; // Replace 'ApplicationDbContext' with your DbContext class

        public JobController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/job/positions
        [HttpGet("positions")]
        public async Task<IActionResult> GetJobPositions()
        {
            try
            {
                var jobPositions = await _context.JobPositions.ToListAsync();
                return Ok(jobPositions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("applications")]
        public async Task<IActionResult> GetJobApplications()
        {
            try
            {
                var jobApplications = await _context.JobApplications
                    .Include(ja => ja.JobPosition) // Include related JobPosition
                    .ToListAsync();

                // Create a list of JobApplicationDTO objects
                var jobApplicationDTOs = jobApplications.Select(ja => new JobApplication
                {
                    Id = ja.Id,
                    JobPositionId = ja.JobPositionId,
                    JobPosition = new JobPosition
                    {
                        Id = ja.JobPosition.Id,
                        Title = ja.JobPosition.Title,
                        Department = ja.JobPosition.Department,
                        Location = ja.JobPosition.Location,
                        Responsibilities = ja.JobPosition.Responsibilities,
                        Qualifications = ja.JobPosition.Qualifications,
                        ApplicationDeadline = ja.JobPosition.ApplicationDeadline,
                        IsClosed = ja.JobPosition.IsClosed
                    },
                    ApplicantName = ja.ApplicantName,
                    Status = ja.Status
                }).ToList();

                return Ok(jobApplicationDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        // GET: api/job/applications
        //[HttpGet("applications")]
        //public async Task<IActionResult> GetJobApplications()
        //{
        //    try
        //    {
        //        var jobApplications = await _context.JobApplications.ToListAsync();
        //        return Ok(jobApplications);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //}

        // GET: api/job/position_title
        [HttpGet("position_title")]
        public IActionResult GetPositionTitles()
        {
            try
            {
                var positionTitles = _context.JobPositions.Select(j => j.Title).ToList();
                return Ok(positionTitles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/job/position/add
        [HttpPost("position/add")]
        public async Task<IActionResult> CreateJobPosition([FromBody] JobPosition jobPosition)
        {
            try
            {
                if (jobPosition == null)
                {
                    return BadRequest("Job position data is invalid.");
                }

                _context.JobPositions.Add(jobPosition);
                await _context.SaveChangesAsync();

                return Ok(jobPosition);

                //return CreatedAtAction("GetJobPosition", new { id = jobPosition.Id }, jobPosition);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("position/update/{id}")]
        public async Task<IActionResult> UpdateJobPositionIsClosed(int id, [FromBody] bool isClosed)
        {
            try
            {
                var jobPosition = await _context.JobPositions.FindAsync(id);

                if (jobPosition == null)
                {
                    return NotFound($"Job position with ID {id} not found.");
                }

                jobPosition.IsClosed = isClosed;
                await _context.SaveChangesAsync();

                return Ok(jobPosition);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // POST: api/job/application/add
        [HttpPost("application/add")]
        public async Task<IActionResult> CreateJobApplication([FromBody] JobApplication jobApplication)
        {
            try
            {
                if (jobApplication == null)
                {
                    return BadRequest("Job application data is invalid.");
                }

                var existingJobPosition = await _context.JobPositions.FindAsync(jobApplication.JobPositionId);

                if (existingJobPosition == null)
                {
                    return BadRequest($"Job position with ID {jobApplication.JobPositionId} does not exist.");
                }

                _context.JobApplications.Add(jobApplication);
                await _context.SaveChangesAsync();

                // Create a response object with the desired format
                var response = new
                {
                    id = jobApplication.Id,
                    jobPositionId = jobApplication.JobPositionId,
                    jobPosition = new
                    {
                        id = existingJobPosition.Id,
                        title = existingJobPosition.Title,
                        department = existingJobPosition.Department,
                        location = existingJobPosition.Location,
                        responsibilities = existingJobPosition.Responsibilities,
                        qualifications = existingJobPosition.Qualifications,
                        applicationDeadline = existingJobPosition.ApplicationDeadline,
                        isClosed = existingJobPosition.IsClosed
                    },
                    applicantName = jobApplication.ApplicantName,
                    status = jobApplication.Status
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        //// POST: api/job/application/add
        //[HttpPost("application/add")]
        //public async Task<IActionResult> CreateJobApplication([FromBody] JobApplication jobApplication)
        //{
        //    try
        //    {
        //        if (jobApplication == null)
        //        {
        //            return BadRequest("Job application data is invalid.");
        //        }
        //        var existingJobPosition = await _context.JobPositions.FindAsync(jobApplication.JobPositionId);

        //        if (existingJobPosition == null)
        //        {
        //            return BadRequest($"Job position with ID {jobApplication.JobPositionId} does not exist.");
        //        }

        //        _context.JobApplications.Add(jobApplication);
        //        await _context.SaveChangesAsync();
        //        return Ok(jobApplication);

        //        //return CreatedAtAction("GetJobApplication", new { id = jobApplication.Id }, jobApplication);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //}

        // POST: api/job/application/add
        //[HttpPost("application/add")]
        //public async Task<IActionResult> CreateJobApplication([FromBody] JobApplication jobApplication)
        //{
        //    try
        //    {
        //        if (jobApplication == null)
        //        {
        //            return BadRequest("Job application data is invalid.");
        //        }

        //        // Check if the associated JobPosition exists
        //        //var existingJobPosition = await _context.JobPositions.FindAsync(jobApplication.JobPositionId);

        //        //if (existingJobPosition == null)
        //        //{
        //        //    return BadRequest($"Job position with ID {jobApplication.JobPositionId} does not exist.");
        //        //}

        //        //Console.WriteLine(existingJobPosition.Title);

        //        _context.JobApplications.Add(jobApplication);
        //        await _context.SaveChangesAsync();
        //        return Ok(jobApplication);

        //        //return CreatedAtAction("GetJobApplication", new { id = jobApplication.Id }, jobApplication);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //}


        // PUT: api/job/application/update/{id}
        [HttpPut("application/update/{id}")]
        public async Task<IActionResult> UpdateJobApplication(int id, [FromBody] JobApplication updatedJobApplication)
        {
            try
            {
                if (updatedJobApplication == null)
                {
                    return BadRequest("Updated job application data is invalid.");
                }

                var existingJobApplication = await _context.JobApplications.FindAsync(id);

                if (existingJobApplication == null)
                {
                    return NotFound($"Job application with ID {id} not found.");
                }

                // Update properties of the existing job application with data from updatedJobApplication
                existingJobApplication.Status = updatedJobApplication.Status;
                //existingJobApplication.Property2 = updatedJobApplication.Property2;
                // Add more properties as needed
                Console.WriteLine(existingJobApplication);

                _context.Entry(existingJobApplication).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(existingJobApplication);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/job/applications/{id}
        [HttpGet("applications/{id}")]
        public async Task<IActionResult> GetJobApplicationById(int id)
        {
            try
            {
                var jobApplication = await _context.JobApplications.FindAsync(id);

                if (jobApplication == null)
                {
                    return NotFound($"Job application with ID {id} not found.");
                }

                return Ok(jobApplication);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // GET: api/job/positions/{id}
        //[HttpGet("positions/{id}")]
        //public async Task<IActionResult> GetJobPositionById(int id)
        //{
        //    try
        //    {
        //        var jobPosition = await _context.JobPositions.FindAsync(id);

        //        if (jobPosition == null)
        //        {
        //            return NotFound($"Job position with ID {id} not found.");
        //        }

        //        return Ok(jobPosition);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //}

        [HttpGet("applications/by-job-position")]
        public async Task<IActionResult> GetJobApplicationsByJobPositionId([FromQuery] int jobPositionId)
        {
            try
            {
                var jobApplications = await _context.JobApplications
                    .Where(j => j.JobPositionId == jobPositionId)
                    .ToListAsync();

                if (jobApplications == null || jobApplications.Count == 0)
                {
                    return NotFound($"No job applications found for job position with ID {jobPositionId}.");
                }

                return Ok(jobApplications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




        // DELETE: api/job/positions/delete
        [HttpDelete("positions/delete")]
        public async Task<IActionResult> DeleteJobPositions()
        {
            try
            {
                var jobPositions = await _context.JobPositions.ToListAsync();
                _context.JobPositions.RemoveRange(jobPositions);
                await _context.SaveChangesAsync();
                return Ok(jobPositions);

                //return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
