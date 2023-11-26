import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-posting-form',
  templateUrl: './job-posting-form.component.html',
  styleUrls: ['./job-posting-form.component.css']
})
export class JobPostingFormComponent implements OnInit {
  jobPostingForm:FormGroup
  constructor(private fb:FormBuilder,private ss:JobService) { }
  jobForm = this.fb.group({
    title :['',Validators.required],
    department:['',Validators.required],
    location:['',Validators.required],
    responsibilities:['',Validators.required],
    qualifications:['',Validators.required],
    applicationDeadline:['',Validators.required]
  })

  ngOnInit(): void {
  }

  submitJobPosting(form:FormGroup){


    this.jobPostingForm = form.value

    if(this.jobPostingForm.valid)
    {
        
    }
  }

}
