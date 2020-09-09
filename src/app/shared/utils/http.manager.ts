import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class HttpManager {
  protected getHeader(): HttpHeaders {
    const headers = {
      'Content-Type': 'application/json'
    };

    return new HttpHeaders(headers);
  }

  protected handleError(error: HttpResponse<any>): Observable<any> {
    return throwError(error);
  }
}
