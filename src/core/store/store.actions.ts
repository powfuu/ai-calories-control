import { createAction, props } from '@ngrx/store';
import { NutritionData } from 'src/app/domain/models/nutrition-data.model';

export const addNutritionData = createAction(
  '[Store] Add Nutrition Data',
  props<{ nutritionData: NutritionData }>(),
);

export const setNutritionData = createAction(
  '[Store] Set Nutrition Data',
  props<{ nutritionData: NutritionData[] }>(),
);
