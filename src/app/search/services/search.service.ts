import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JobSearchResponse } from 'src/app/shared/types/jobSearchResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  searchJob(query: string): Observable<JobSearchResponse> {
    const endpoint = this.apiUrl + `?query=${query}`;
    return this.httpClient.get<JobSearchResponse>(endpoint, {
      headers: {
        'X-RapidAPI-Key': '124f20a58fmsh39f16fc6b0a6b01p1ef20ajsnc2cd4710ce38',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    });
  }
}
