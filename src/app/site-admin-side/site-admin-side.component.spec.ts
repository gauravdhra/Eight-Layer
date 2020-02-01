import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAdminSideComponent } from './site-admin-side.component';

describe('SiteAdminSideComponent', () => {
  let component: SiteAdminSideComponent;
  let fixture: ComponentFixture<SiteAdminSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAdminSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
