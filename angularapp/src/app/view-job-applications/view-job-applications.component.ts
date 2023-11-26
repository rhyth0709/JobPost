import { Component, OnInit } from '@angular/core';
import { JobApplication } from 'src/models/job-application.model';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-view-job-applications',
  templateUrl: './view-job-applications.component.html',
  styleUrls: ['./view-job-applications.component.css']
})
export class ViewJobApplicationsComponent implements OnInit {


 

  constructor(private ss : JobService) { }


  jobApplications:JobApplication[] = []
  loadJobApplications(){

    this.ss.getJobApplications().subscribe((data:JobApplication[])=>{
      this.jobApplications = data
    })

  }
  ngOnInit(): void {
  }

}
