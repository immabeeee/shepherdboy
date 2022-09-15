// Translate Class to extend
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export class AppTranslateService implements TranslateLoader {
  public url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<unknown> {
    return this.http
      .get(this.url + `/assets/i18n/${lang}.json`)
      .pipe(catchError(() => this.http.get(this.url + `/assets/i18n/us.json`)));
  }
}
