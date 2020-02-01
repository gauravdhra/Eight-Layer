import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEnterpriseComponent } from './client-enterprise.component';

describe('ClientEnterpriseComponent', () => {
  let component: ClientEnterpriseComponent;
  let fixture: ComponentFixture<ClientEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
