import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAdminFeedbackComponent } from './site-admin-feedback.component';

describe('SiteAdminFeedbackComponent', () => {
  let component: SiteAdminFeedbackComponent;
  let fixture: ComponentFixture<SiteAdminFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAdminFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdminFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
