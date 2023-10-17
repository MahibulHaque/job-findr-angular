import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobDetailResponseInterface } from 'src/app/shared/types/jobDetailResponseInterface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobDetailSearchService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getJobDetail(jobId: string): Observable<JobDetailResponseInterface> {
    const url = new URL(`${this.apiUrl}/job-details`);
    url.searchParams.set('job_id', jobId);

    return this.httpClient.get<JobDetailResponseInterface>(url.toString(), {
      headers: {
        'X-RapidAPI-Key': environment.rapidApiKey,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    });
  }
}