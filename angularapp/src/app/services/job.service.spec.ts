import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { JobService } from './job.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('JobService Integration Tests', () => {
  let service: JobService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpClientTestingModule],
      providers: [JobService]
    });
    service = TestBed.get(JobService);
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;
    httpMock = TestBed.inject(HttpTestingController);

  });

  fit('JobService_should_get_JobApplications', () => {
    const mockPackages = [
      {
          id: 1,
          jobPositionId: 123,
          applicantName: 'John Doe',
          status: 'shortlist',
      },
    ];
    service['getJobApplications']().subscribe(packages => {
      expect(packages).toEqual(mockPackages);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/applications`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPackages);
  });

  fit('JobService_should_post_a_new_job_application', () => {
    const newJobApplication = {
      id:1,
      jobPositionId: 123,
      applicantName: 'John Doe',
      status: 'pending'
    };

    service['applyForJob'](newJobApplication).subscribe(response => {
      // Add expectations if needed
      expect(response).toBeTruthy();

    });

    const req = httpMock.expectOne(`${service['apiUrl']}/application/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newJobApplication);
    req.flush({});
  });

  fit('JobService_should_post_a_new_job_position', () => {
    const newJobPosition = {
      id: 1,
      title: 'Software Developer',
      department: 'IT',
      location: 'Remote',
      responsibilities: 'Develop software applications',
      qualifications: 'Bachelor\'s degree in Computer Science',
      applicationDeadline: new Date('2023-12-31'),
      isClosed: false,
      applications: [],
    };

    service['createJobPosition'](newJobPosition).subscribe(response => {
      // Add expectations if needed
      expect(response).toBeTruthy();

    });

    const req = httpMock.expectOne(`${service['apiUrl']}/position/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newJobPosition);
    req.flush({});
  });

  fit('JobService_should_update_the_status_of_a_job_application', () => {
    const applicationId = 1;
    const applicantName = 'John Doe';
    const newStatus = 'shortlist';
    service['updateApplicationStatus'](applicationId, applicantName, newStatus).subscribe(res => {
      // Add expectations if needed
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(`${service['apiUrl']}/application/update/${applicationId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ applicantName, status: newStatus });
    req.flush({});
  });

  fit('JobService should get total applicants by job position id', () => {
    const jobPositionId = 123;
    const mockTotalApplicants = 10;

    service['getTotalApplicantsByJobPositionId'](jobPositionId).subscribe((totalApplicants) => {
      expect(totalApplicants).toEqual(mockTotalApplicants);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/applications/by-job-position?jobPositionId=${jobPositionId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTotalApplicants);
  });

  fit('JobService_should_get_JobPostings', () => {
    const mockPackages = [
      {
        id: 1,
        title: 'Software Developer',
        department: 'IT',
        location: 'Remote',
        responsibilities: 'Develop software applications',
        qualifications: 'Bachelor\'s degree in Computer Science',
        applicationDeadline: new Date('2023-12-31'),
        isClosed: false,
        applications: [],
      },
    ];

    service['getJobPostings']().subscribe(packages => {
      expect(packages).toEqual(mockPackages);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/positions`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPackages);
  });


  fit('JobService_should_be_created', () => {
    expect(service).toBeTruthy();
  });

  // fit('JobService_should_retrieve_JobPosition_from_the_backend', (done: DoneFn) => {
  //   service['getJobPostings']().subscribe(
  //     (teams: JobPosition[]) => {
  //       console.log("length"+teams.length)
  //       expect(teams.length).toBeGreaterThan(0); // Check if any teams are retrieved
  //       done();
  //     },
  //     (error: any) => {
  //       fail('Failed to retrieve teams: ' + JSON.stringify(error));
  //     }
  //   );
  // });

  // fit('JobService_should_retrieve_JopApplications_from_the_backend', (done: DoneFn) => {
  //   service['getJobApplications']().subscribe(
  //     (teams: JobApplication[]) => {
  //       console.log("length"+teams.length)
  //       expect(teams.length).toBeGreaterThan(0); // Check if any teams are retrieved
  //       done();
  //     },
  //     (error: any) => {
  //       fail('Failed to retrieve teams: ' + JSON.stringify(error));
  //     }
  //   );
  // });

  fit('JobService_should_have_a_markJobAsClosed_function', () => {
    expect(service['markJobAsClosed']).toBeDefined();
  });


})
