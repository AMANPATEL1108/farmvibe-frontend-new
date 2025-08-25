import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProdutsCategoryComponent } from './user-produts-category-component';

describe('UserProdutsCategoryComponent', () => {
  let component: UserProdutsCategoryComponent;
  let fixture: ComponentFixture<UserProdutsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProdutsCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProdutsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
