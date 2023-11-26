import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ViewJobApplicationsComponent } from './view-job-applications.component';
import { FormsModule } from '@angular/forms';
import { JobService } from '../services/job.service';
import { of } from 'rxjs';
import { JobApplication } from 'src/models/job-application.model';

describe('ViewJobApplicationsComponent', () => {
  let component: ViewJobApplicationsComponent;
  let fixture: ComponentFixture<ViewJobApplicationsComponent>;
  let jobService: jasmine.SpyObj<JobService>;

  beforeEach(async(() => {
    const jobServiceSpy = jasmine.createSpyObj('JobService', ['getJobApplications', 'updateApplicationStatus']);

    TestBed.configureTestingModule({
      declarations: [ViewJobApplicationsComponent],
      imports: [FormsModule],
      providers: [{ provide: JobService, useValue: jobServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewJobApplicationsComponent);
    component = fixture.componentInstance;
    jobService = TestBed.get(JobService) as jasmine.SpyObj<JobService>;
  }));

  fit('ViewJobApplicationsComponent should be created', () => {
    expect(component).toBeTruthy();
  });

  fit('ViewJobApplicationsComponent_should_load_job_applications', () => {
    const mockApplications: JobApplication[] = [
      { id: 1, ['jobPositionId']: 1, applicantName: 'Applicant 1', status: 'shortlist' },
      { id: 2, ['jobPositionId']: 2, applicantName: 'Applicant 2', status: 'reject' },
    ];

    jobService['getJobApplications'].and.returnValue(of(mockApplications));

    component['loadJobApplications']();

    expect(component['jobApplications']).toEqual(mockApplications);
    console.log("byeee"+mockApplications);
    console.log(mockApplications);


  });

  fit('ViewJobApplicationsComponent_should_render_a_table_with_headers', () => {
    const compiled = fixture.nativeElement;
    const table = compiled.querySelector('table');
    expect(table).toBeTruthy();

    const headers = table.querySelectorAll('thead th');
    expect(headers.length).toBe(3); // Ensure there are 3 headers
    expect(headers[0].textContent).toContain('Applicant Name');
    expect(headers[1].textContent).toContain('Job Title');
    expect(headers[2].textContent).toContain('Action');
  });

  // fit('should render a row for each job application', () => {
  //   // Mock jobApplications data
  //   component.jobApplications = [
  //     {
  //       applicantName: 'Applicant 1',
  //       jobPositionId:1,
  //       status: 'shortlist',
  //       id: 1,
  //     },
  //     {
  //       applicantName: 'Applicant 2',
  //       jobPositionId: 1,
  //       status: 'reject',
  //       id: 2,
  //     },
  //   ];

  //   fixture.detectChanges();

  //   const compiled = fixture.nativeElement;
  //   const rows = compiled.querySelectorAll('tbody tr');
  //   expect(rows.length).toBe(2); // Ensure there are 2 rows

  //   // Check if data is rendered correctly in the rows
  //   const firstRow = rows[0].querySelectorAll('td');
  //   expect(firstRow.length).toBe(3); // Ensure there are 3 columns in the row
  //   expect(firstRow[0].textContent).toContain('Applicant 1');
  //   // expect(firstRow[1].textContent).toContain('Job 1');

  //   const secondRow = rows[1].querySelectorAll('td');
  //   expect(secondRow.length).toBe(3);
  //   expect(secondRow[0].textContent).toContain('Applicant 2');
  //   // expect(secondRow[1].textContent).toContain('Job 2');
  // });
});
