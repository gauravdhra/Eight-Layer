import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Questiontype2Component } from './questiontype2.component';

describe('Questiontype2Component', () => {
  let component: Questiontype2Component;
  let fixture: ComponentFixture<Questiontype2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Questiontype2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Questiontype2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
