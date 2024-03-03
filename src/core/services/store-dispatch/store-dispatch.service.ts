import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NutritionData } from 'src/app/domain/models/nutrition-data.model';
import {
  addNutritionData,
  setNutritionData,
} from 'src/core/store/store.actions';

@Injectable({
  providedIn: 'root',
})
export class StoreDispatchService {
  store = inject(Store<NutritionData>);

  addNutritionDataToLog(nutritionData: NutritionData) {
    this.store.dispatch(addNutritionData({ nutritionData }));
  }

  setNutritionDataLog(nutritionData: NutritionData[]) {
    this.store.dispatch(setNutritionData({ nutritionData }));
  }
}
