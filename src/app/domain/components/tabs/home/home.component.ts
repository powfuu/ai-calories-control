import { Component, inject } from '@angular/core';
import { mergeMap, finalize, take } from 'rxjs';
import { NutritionData } from 'src/app/domain/models/nutrition-data.model';
import { LoadingService } from 'src/core/services/loading/loading.service';
import { OpenAiService } from 'src/core/services/openai/openai.service';
import { ToastService } from 'src/core/services/toast/toast.service';
import { UtilService } from 'src/core/services/util/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  openAi: OpenAiService = inject(OpenAiService);
  toast: ToastService = inject(ToastService);
  loading: LoadingService = inject(LoadingService);
  utilService: UtilService = inject(UtilService);
  dataInput: string = '';
  selectedData: string = 'not_selected -- undefined';
  dataResponse!: NutritionData;

  constructor() {}

  calculateStatistics() {
    if (this.dataInput.length > 0) {
      if (this.selectedData !== this.dataInput) {
        this.loading
          .startLoader('Generating Response...')
          .pipe(
            take(1),
            mergeMap(() =>
              this.openAi.getApiResponse(this.dataInput, 'howManyCalories'),
            ),
            finalize(() => this.loading.dismissLoader()),
          )
          .subscribe((response) => {
            const content = response.choices[0].message.content;
            if (content.indexOf('undefined') === -1) {
              const responseContent = content
                .split(', ')
                .reduce(
                  (acc: any, pair: any) => (
                    (acc[pair.split(': ')[0]] = pair.split(': ')[1]), acc
                  ),
                  {},
                );
              this.dataResponse = responseContent;
              this.dataResponse.title = this.dataInput;
              this.utilService.addNutritionDataToLog(responseContent);
            } else {
              this.toast.error(
                'Data is invalid, please try again with a different prompt.',
              );
            }
            this.selectedData = this.dataInput;
          });
      } else {
        this.toast.error('Change the input field to get another results.');
      }
    } else {
      this.toast.error(
        'Must provide the required information in the input field.',
      );
    }
  }
}
