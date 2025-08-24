import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Extra } from './extra';

describe('Extra', () => {
  let component: Extra;
  let fixture: ComponentFixture<Extra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Extra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Extra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
