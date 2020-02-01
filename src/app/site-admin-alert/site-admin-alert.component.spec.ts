import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAdminAlertComponent } from './site-admin-alert.component';

describe('SiteAdminAlertComponent', () => {
  let component: SiteAdminAlertComponent;
  let fixture: ComponentFixture<SiteAdminAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAdminAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdminAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
