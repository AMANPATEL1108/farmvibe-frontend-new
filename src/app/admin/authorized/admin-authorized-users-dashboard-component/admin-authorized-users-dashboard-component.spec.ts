import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorizedUsersDashboardComponent } from './admin-authorized-users-dashboard-component';

describe('AdminAuthorizedUsersDashboardComponent', () => {
  let component: AdminAuthorizedUsersDashboardComponent;
  let fixture: ComponentFixture<AdminAuthorizedUsersDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthorizedUsersDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorizedUsersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
