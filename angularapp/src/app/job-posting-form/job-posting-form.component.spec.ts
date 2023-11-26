import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { JobPostingFormComponent } from './job-posting-form.component';
import { HttpClientModule } from '@angular/common/http';

describe('JobPostingFormComponent (HTML)', () => {
  let component: JobPostingFormComponent;
  let fixture: ComponentFixture<JobPostingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobPostingFormComponent],
      imports: [ReactiveFormsModule,HttpClientModule],
    });

    fixture = TestBed.createComponent(JobPostingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('JobPostingFormComponent should be created', () => {
    expect(component).toBeTruthy();
  });

  fit('JobPostingFormComponent should initialize the submitJobPosting function', () => {
    expect(component['submitJobPosting']).toBeDefined();
  });

  fit('JobPostingFormComponent should call submitJobPosting when the form is submitted', fakeAsync(() => {
    // spyOn(component, 'submitJobPosting');
    component['submitJobPosting'] = jasmine.createSpy('submitJobPosting');

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    tick();
    expect(component['submitJobPosting']).toHaveBeenCalled();
  }));

  fit('JobPostingFormComponent should validate required fields in the job posting form', () => {
    const form = component['jobPostingForm'];
    expect(form.valid).toBeFalsy();
    form['controls']['title'].setValue('Test Title');
    form['controls']['department'].setValue('Test Department');
    form['controls']['location'].setValue('Test Location');
    form['controls']['responsibilities'].setValue('Test Responsibilities');
    form['controls']['qualifications'].setValue('Test Qualifications');
    form['controls']['applicationDeadline'].setValue('2023-12-31');
    expect(form.valid).toBeTruthy();
  });

  fit('JobPostingFormComponent should not submit post if field is empty in the form', () => {
    const form = component['jobPostingForm'];
    expect(form.valid).toBeFalsy();
    form['controls']['title'].setValue('Test Title');
    form['controls']['department'].setValue('Test Department');
    form['controls']['location'].setValue('Test Location');
    form['controls']['responsibilities'].setValue('Test Responsibilities');
    form['controls']['qualifications'].setValue('');
    form['controls']['applicationDeadline'].setValue('2023-12-31');
    expect(form.valid).toBeFalsy();
  });


  fit('JobPostingFormComponent should render the form fields', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Create Job Posting');
    expect(compiled.querySelector('form')).toBeTruthy();
    // expect(compiled.querySelector('label[for="title"]').textContent).toContain('Job Title');
    expect(compiled.querySelector('input[id="title"]')).toBeTruthy();
    // expect(compiled.querySelector('label[for="department"]').textContent).toContain('Department');
    expect(compiled.querySelector('input[id="department"]')).toBeTruthy();
    // expect(compiled.querySelector('label[for="location"]').textContent).toContain('Location');
    expect(compiled.querySelector('input[id="location"]')).toBeTruthy();
    // expect(compiled.querySelector('label[for="responsibilities"]').textContent).toContain('Responsibilities');
    expect(compiled.querySelector('textarea[id="responsibilities"]')).toBeTruthy();
    // expect(compiled.querySelector('label[for="qualifications"]').textContent).toContain('Qualifications');
    expect(compiled.querySelector('textarea[id="qualifications"]')).toBeTruthy();
    // expect(compiled.querySelector('label[for="applicationDeadline"]').textContent).toContain('Application Deadline');
    expect(compiled.querySelector('input[id="applicationDeadline"]')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]').textContent).toContain('Submit');
  });


});
