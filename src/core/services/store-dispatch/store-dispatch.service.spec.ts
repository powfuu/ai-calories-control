import { TestBed } from '@angular/core/testing';

import { StoreDispatchService } from './store-dispatch.service';

describe('StoreDispatchService', () => {
  let service: StoreDispatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreDispatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
