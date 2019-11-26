import { TestBed } from '@angular/core/testing';

import { CartServiceService } from './CartService.service';

describe('CartServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartServiceService = TestBed.get(CartServiceService);
    expect(service).toBeTruthy();
  });
});
