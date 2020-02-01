import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAdminConfigComponent } from './site-admin-config.component';

describe('SiteAdminConfigComponent', () => {
  let component: SiteAdminConfigComponent;
  let fixture: ComponentFixture<SiteAdminConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAdminConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdminConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
