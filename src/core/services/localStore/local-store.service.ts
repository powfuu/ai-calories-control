import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class LocalStoreService {
  constructor() {}

  async setToLocalStore(key: string, value: any): Promise<void> {
    try {
      await Preferences.set({ key: key, value: JSON.stringify(value) });
    } catch (error) {
      console.error(`Error in set to local store: [${key}]`, error);
      throw error;
    }
  }

  async getFromLocalStore(key: string): Promise<any> {
    try {
      const preference = await Preferences.get({ key: key });

      if (preference && typeof preference.value === 'string') {
        return JSON.parse(preference.value);
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error in get from local store: [${key}]`, error);
      throw error;
    }
  }

  async removeFromLocalStore(key: string): Promise<void> {
    try {
      await Preferences.remove({ key: key });
    } catch (error) {
      console.error(`Error in remove from local store: [${key}]`, error);
      throw error;
    }
  }

  async pushValue(key: string, value: any): Promise<void> {
    try {
      let currentLog = await this.getFromLocalStore(key);
      if (!Array.isArray(currentLog)) {
        currentLog = [];
      }
      const updatedLog = [...currentLog, value];
      await this.setToLocalStore(key, updatedLog);
    } catch (error) {
      console.error(`Error in push to local store: [${key}]`, error);
      throw error;
    }
  }
}
