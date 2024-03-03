import { initialState } from './store.state';
import { createReducer, on } from '@ngrx/store';
import { addNutritionData, setNutritionData } from './store.actions';

export const storeReducer = createReducer(
  initialState,
  on(addNutritionData, (state, { nutritionData }) => ({
    nutritionLog: [...state.nutritionLog, nutritionData],
  })),
  on(setNutritionData, (state, { nutritionData }) => ({
    nutritionLog: nutritionData,
  })),
);
