import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAdminReportsComponent } from './site-admin-reports.component';

describe('SiteAdminReportsComponent', () => {
  let component: SiteAdminReportsComponent;
  let fixture: ComponentFixture<SiteAdminReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAdminReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdminReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
