import { NutritionData } from './../../app/domain/models/nutrition-data.model';

export interface nutritionStore {
  nutritionStore: StoreState;
}

export interface StoreState {
  nutritionLog: NutritionData[];
}

export const initialState: StoreState = {
  nutritionLog: [],
};
