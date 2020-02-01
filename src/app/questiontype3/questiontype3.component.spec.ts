import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Questiontype3Component } from './questiontype3.component';

describe('Questiontype3Component', () => {
  let component: Questiontype3Component;
  let fixture: ComponentFixture<Questiontype3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Questiontype3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Questiontype3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
