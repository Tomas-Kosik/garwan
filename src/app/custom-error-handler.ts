import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  public constructor() { }

  public handleError(error: Error | HttpErrorResponse): void {
    console.dir(`${this.getErrorType(error)}: ${error}`);
  }

  private getErrorType(error: Error | HttpErrorResponse): string {
    if (!(error instanceof HttpErrorResponse)) {
      return `[client-side error]`;
    }

    return navigator.onLine ? `[server-side error]` : `[connection error]`;
  }
}
