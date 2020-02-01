import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientlessonsComponent } from './clientlessons.component';

describe('ClientlessonsComponent', () => {
  let component: ClientlessonsComponent;
  let fixture: ComponentFixture<ClientlessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientlessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientlessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
