import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JobApplication } from 'src/models/job-application.model';
import { JobPosition } from 'src/models/job-position.model';
@Injectable({
  providedIn: 'root'
})
export class JobService {

  public apiUrl = "https://8080-abfbbcbcacd307836325ebabcbbfabeeffone.premiumproject.examly.io/api/job";

  constructor(private httpClient:HttpClient) { }

  httpOptions ={
    headers:new HttpHeaders({

      'Content-type':'application/json'

  })}


  getJobPostings():Observable<JobPosition[]>{
    return this.httpClient.get<JobPosition[]>(this.apiUrl+'/positions')
  }
  getJobApplications():Observable<JobApplication[]>{
    return this.httpClient.get<JobApplication[]>(this.apiUrl+'/applications')
  }

  getPositionTitles():Observable<JobPosition[]>{
    return this.httpClient.get<JobPosition[]>(this.apiUrl+'/position_title')
  }

  markJobAsClosed(jobId:number){

  }
  createJobPosition(jobPositionData:JobPosition):Observable<JobPosition>{
   return this.httpClient.post<JobPosition>(this.apiUrl+'/position/add',jobPositionData,this.httpOptions)
  }

  applyForJob(jobApplicationData:JobApplication):Observable<JobApplication>{
    return this.httpClient.post<JobApplication>(this.apiUrl+'/application/add',jobApplicationData,this.httpOptions)
   }

   updateApplicationStatus(applicationId:number,applicantName:string,newStatus:string):Observable<JobApplication>{
    return this.httpClient.put<JobApplication>(this.apiUrl+'/application/update/'+applicationId,{applicantName:applicantName,status:newStatus})
   }

   getTotalApplicantsByJobPositionId(jobPositionId:any):Observable<number>{
    return this.httpClient.get<number>(`${this.apiUrl}/applications/by-job-position?jobPositionId=${jobPositionId}`)
  }
  


}
