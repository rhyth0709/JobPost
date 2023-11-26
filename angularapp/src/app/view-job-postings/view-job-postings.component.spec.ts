import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ViewJobPostingsComponent } from './view-job-postings.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
// import { JobService } from '../services/job.service'; // Import your JobService

describe('ViewJobPostingsComponent', () => {
  let component: ViewJobPostingsComponent;
  let fixture: ComponentFixture<ViewJobPostingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewJobPostingsComponent],
      imports: [FormsModule, HttpClientModule], // Include HttpClientModule
      // providers: [JobService], // Provide JobService
    });

    fixture = TestBed.createComponent(ViewJobPostingsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  fit('ViewJobPostingsComponent should be created', () => {
    expect(component).toBeTruthy();
  });

  fit('ViewJobPostingsComponent_should_render_a_table_with_headers', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const table = compiled.querySelector('table');
    expect(table).toBeTruthy();
    const headers = compiled.querySelectorAll('th');
    expect(headers.length).toBe(8); // Assuming you have 8 headers
  });


});
