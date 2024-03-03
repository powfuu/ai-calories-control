import { UtilService } from 'src/core/services/util/util.service';
import { Observable } from 'rxjs';
import { LocalStoreService } from './../../../../../core/services/localStore/local-store.service';
import { Component, OnInit, inject } from '@angular/core';
import { NutritionData } from 'src/app/domain/models/nutrition-data.model';
import { Store } from '@ngrx/store';
import { nutritionStore } from 'src/core/store/store.state';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  localStore: LocalStoreService = inject(LocalStoreService);
  nutritionStore: Store<nutritionStore> = inject(Store<nutritionStore>);
  util: UtilService = inject(UtilService);
  log$!: Observable<NutritionData[]>;

  async ngOnInit() {
    const nutritionDataLogFromLocalStore =
      await this.localStore.getFromLocalStore('log');
    this.util.setNutritionDataLog(nutritionDataLogFromLocalStore);
    this.log$ = this.nutritionStore.select(
      (state) => state.nutritionStore.nutritionLog,
    );
  }
}
