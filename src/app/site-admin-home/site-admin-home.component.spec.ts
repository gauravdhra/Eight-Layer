import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAdminHomeComponent } from './site-admin-home.component';

describe('SiteAdminHomeComponent', () => {
  let component: SiteAdminHomeComponent;
  let fixture: ComponentFixture<SiteAdminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAdminHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
