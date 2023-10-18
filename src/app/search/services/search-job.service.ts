import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { JobSearchResponse } from 'src/app/shared/types/jobSearchResponse.interface';
import { JobDetailResponseInterface } from 'src/app/shared/types/jobDetailResponseInterface';
// import { JobSearchResponse } from 'src/app/shared/types/jobSearchResponse.interface';

export type EmploymentType = 'FULLTIME' | 'PARTTIME' | 'CONTRACTOR' | 'INTERN';
export type ExperienceType =
  | 'under_3_years_experience'
  | 'more_than_3_years_experience'
  | 'no_experience'
  | 'no_degree';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  searchJob(
    query: string,
    employment_types?: string,
    experience?: string,
    remote_jobs_only?: boolean,
    sortBy?: string
  ): Observable<JobSearchResponse> {
    const url = new URL(`${this.apiUrl}/search`);
    url.searchParams.set('query', query);

    if (employment_types) {
      url.searchParams.set('employment_types', employment_types);
    }

    if (experience) {
      url.searchParams.set('experience', experience);
    }

    if (remote_jobs_only) {
      url.searchParams.set('remote_jobs_only', `${remote_jobs_only}`);
    }

    return this.httpClient
      .get<JobSearchResponse>(url.toString(), {
        headers: {
          'X-RapidAPI-Key': environment.rapidApiKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
      })
      .pipe(
        map((response) => {
          if (response.data && sortBy === 'rating') {
            response.data = response.data.sort(
              (a, b) => a.job_apply_quality_score - b.job_apply_quality_score
            );
          }

          if (response.data && sortBy === 'alphabet') {
            response.data = response.data.sort((a, b) =>
              a.job_title.localeCompare(b.job_title)
            );
          }
          return response;
        })
      );
  }
}
