import { Component, OnInit, inject } from '@angular/core';
import { Observable, finalize, map, of, take } from 'rxjs';
import { Constants } from 'src/app/constants/app.constants';
import { SystemContent } from 'src/app/domain/models/system-content.model';
import { OpenAiService } from 'src/core/services/openai/openai.service';
import { ToastService } from 'src/core/services/toast/toast.service';

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.scss'],
})
export class AiComponent implements OnInit {
  input: string = '';
  selectedData: string = '';
  isLoading: boolean = false;
  isLoadingData: boolean = false;
  suggestions$!: Observable<string[]>;
  result$: Observable<any> | null = null;

  openAi = inject(OpenAiService);
  toast = inject(ToastService);

  ngOnInit() {
    this.getSuggestions();
  }

  getResponseInput(value: string) {
    this.isLoadingData = true;
    this.selectedData = value;
    this.openAi
      .getApiResponse(value, Constants.OPENAI_TYPE_SR)
      .pipe(
        take(1),
        finalize(() => (this.isLoadingData = false)),
      )
      .subscribe({
        next: (data) => {
          const messagePrompt = data.choices[0].message.content;
          this.result$ = of(messagePrompt);
        },
        error: () =>
          this.toast.error(
            'Process has failed, search input may be wrong or contains an incorrect prompt.',
          ),
      });
  }

  getSuggestions(): void {
    this.suggestions$ = new Observable((observer) => {
      const suggestions = [
        'Healthy',
        'Lose weight',
        'Foods',
        'Calories',
        'Body management',
        'Excercises',
        'Diet',
      ];
      observer.next(suggestions);
      observer.complete();
      this.isLoading = false;
    });
  }
}
