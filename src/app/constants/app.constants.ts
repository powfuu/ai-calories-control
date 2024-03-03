import { SystemContent } from '../domain/models/system-content.model';

export const Constants = {
  OPENAI_TYPE_HMC: 'howManyCalories' as keyof SystemContent,
  OPENAI_TYPE_SR: 'suggestionResponse' as keyof SystemContent,
};
