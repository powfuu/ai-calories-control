import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { from, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(public loadingController: LoadingController) {}

  startLoader(message: string): Observable<void> {
    return from(
      this.loadingController.create({
        mode: 'md',
        message: message || 'Loading...',
        cssClass: 'custom-loading',
      }),
    ).pipe(mergeMap((response) => from(response.present())));
  }

  dismissLoader(): Observable<boolean> {
    return from(this.loadingController.dismiss());
  }
}
