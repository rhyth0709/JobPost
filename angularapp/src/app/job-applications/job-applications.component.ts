import { Component, OnInit } from '@angular/core';
import { JobPosition } from 'src/models/job-position.model';
import { JobService } from '../services/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {

  positions : JobPosition[]=[]

  constructor(private ss :JobService,private fb:FormBuilder) { }

  jobApplicationForm = this.fb.group({

    jobPositionId : ['',Validators.required],
    applicantName : ['',Validators.required]

  })

  ngOnInit(): void {

    this.ss.getPositionTitles().subscribe((data:JobPosition[])=>{
      this.positions = data
    })

  }

  applyForJob(formData : FormGroup){

    if(formData.valid){
      

    }

  }

}
