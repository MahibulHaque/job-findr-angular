import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JobSearchResponse } from 'src/app/shared/types/jobSearchResponse.interface';
// import { JobSearchResponse } from 'src/app/shared/types/jobSearchResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  searchJob(query: string): any {
    const url = new URL(this.apiUrl);
    url.searchParams.set('query', query);

    return this.httpClient.get<JobSearchResponse>(url.toString(), {
      headers: {
        'X-RapidAPI-Key': environment.rapidApiKey,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    });
  }
}
