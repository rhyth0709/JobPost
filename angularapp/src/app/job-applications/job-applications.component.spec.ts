import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { JobApplicationsComponent } from './job-applications.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { JobService } from '../services/job.service';

describe('JobApplicationsComponent', () => {
  let component: JobApplicationsComponent;
  let fixture: ComponentFixture<JobApplicationsComponent>;
  // let jobServiceSpy: any;
  let jobService: jasmine.SpyObj<JobService>;




  beforeEach(() => {
    const jobServiceSpy = jasmine.createSpyObj('JobService', ['getJobPostings', 'applyForJob']);

    TestBed.configureTestingModule({
      declarations: [JobApplicationsComponent],
      imports: [ReactiveFormsModule,HttpClientModule],
      providers: [{ provide: ['JobService'], useValue: jobServiceSpy }],
    });

    fixture = TestBed.createComponent(JobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jobService = TestBed.inject(JobService) as jasmine.SpyObj<JobService>;

  });

  fit('JobApplicationsComponent should be created', () => {
    expect(component).toBeTruthy();
  });

  fit('JobApplicationsComponent should initialize the JobApplication applyForJob function', () => {
    expect(component['applyForJob']).toBeDefined();
  });


  fit('JobApplicationsComponent should call applyForJob when the form is submitted', fakeAsync(() => {
    // spyOn(component, 'applyForJob');
    component['applyForJob'] = jasmine.createSpy('applyForJob');

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    tick();
    expect(component['applyForJob']).toHaveBeenCalled();
  }));

  fit('JobApplicationsComponent should validate required fields in the application form', () => {
    const form = component['jobApplicationForm'];
    expect(form.valid).toBeFalsy();
    form.controls['applicantName'].setValue('Test Title');
    form.controls['jobPositionId'].setValue(1);
    expect(form.valid).toBeTruthy();
  });


  fit('JobApplicationsComponent should not submit application if field is empty in the form', () => {
    const form = component['jobApplicationForm'];
    expect(form.valid).toBeFalsy();
    form.controls['applicantName'].setValue('Test Title');
    form.controls['jobPositionId'].setValue('');
    expect(form.valid).toBeFalsy();
  });

  fit('JobApplicationsComponent should show the job position dropdown if jobPositions are available', () => {
    // Set the jobPositions array in the component
    component['jobPositions'] = [{ id: 1, title: 'Software Developer' }];

    fixture.detectChanges(); // Trigger change detection

    const dropdown = fixture.nativeElement.querySelector('#jobPositionId');
    expect(dropdown).toBeTruthy();
  });

  fit('JobApplicationsComponent should render job positions in the dropdown using ngFor', () => {
    // Set jobPositions in the component
    component['jobPositions'] = [
      { id: 1, title: 'Software Developer' },
      { id: 2, title: 'Data Analyst' },
    ] as any;

    fixture.detectChanges(); // Trigger change detection

    const dropdownOptions = fixture.nativeElement.querySelectorAll('#jobPositionId option');
    expect(dropdownOptions.length).toBe(2);
    expect(dropdownOptions[0].textContent.trim()).toBe('Software Developer');
    expect(dropdownOptions[1].textContent.trim()).toBe('Data Analyst');
  });


});
