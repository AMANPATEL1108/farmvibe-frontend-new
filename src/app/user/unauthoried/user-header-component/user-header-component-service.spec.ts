import { TestBed } from '@angular/core/testing';

import { UserHeaderComponentService } from './user-header-component-service';

describe('UserHeaderComponentService', () => {
  let service: UserHeaderComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHeaderComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
