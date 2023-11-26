import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from 'src/models/job-application.model';
import { JobPosition } from 'src/models/job-position.model';
@Injectable({
  providedIn: 'root'
})
export class JobService {

  public apiUrl = "https://8080-abfbbcbcacd307836325ebabcbbfabeeffone.premiumproject.examly.io/api/job/";

  constructor(private httpClient:HttpClient) { }


  getJobPostings():Observable<JobPosition[]>{
    return this.httpClient.get<JobPosition[]>(this.apiUrl+'/')
  }

}
