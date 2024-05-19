import { Injectable } from '@angular/core';
import * as introJs from 'intro.js/intro.js';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class IntroJSService {

    introJS = null;

    constructor(
      private cookieService: CookieService
    ) {
        this.introJS = introJs();
    }

    focusElements(keyword: string, elementIds: string[], introTexts: string[],manuallyStart = false) {
      if (!manuallyStart){
        const cookieExists = this.cookieService.check(keyword);
        if (cookieExists) {
         return;
        }
      }


      setTimeout(() => {
        const elements = elementIds.map(id => document.querySelector('#' + id));
        const introSteps = elements.map((element, index) => {
          return {
            element: element,
            intro: introTexts[index]
          };
        });

        if (elements.length > 0) {


          this.introJS.setOptions({
            steps: introSteps,
            showButtons: true,
            buttonClass: 'btn btn-soft-primary btn-sm',
          });

          const cookieExists = this.cookieService.check(keyword);
          if (!cookieExists) {
            this.introJS.onexit(() => {
              document.dispatchEvent(new Event('cookieChanged'));
              this.cookieService.set(keyword, 'true');
            });
          }
        }
        this.introJS.start();
      });
    }


    stopIntro() {
        if (this.introJS) {
            this.introJS.exit();
        }
    }
    checkCookieValue(keyword: string): Observable<boolean> {
      const cookieValue = this.cookieService.get(keyword);
      return of(cookieValue === 'true');
    }
}
