import { TestBed } from '@angular/core/testing';

import { UserRegisterComponentService } from './user-register-component-service';

describe('UserRegisterComponentService', () => {
  let service: UserRegisterComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegisterComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
