import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { storeReducer } from './store.reducer';

@NgModule({
  imports: [StoreModule.forFeature('store', storeReducer)],
  exports: [StoreModule],
})
export class StoreAppModule {}
