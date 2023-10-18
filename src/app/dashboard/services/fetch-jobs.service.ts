import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobSearchResponse } from 'src/app/shared/types/jobSearchResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FetchJobsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  fetchJobs(query: string, page: number): Observable<JobSearchResponse> {
    const url = new URL(`${this.apiUrl}/search`);
    url.searchParams.set('query', query);
    url.searchParams.set('page', page.toString()); // Pass page parameter

    return this.httpClient.get<JobSearchResponse>(url.toString(), {
      headers: {
        'X-RapidAPI-Key': environment.rapidApiKey,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    });
  }
}
