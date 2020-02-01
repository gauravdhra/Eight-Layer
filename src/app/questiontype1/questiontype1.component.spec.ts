import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Questiontype1Component } from './questiontype1.component';

describe('Questiontype1Component', () => {
  let component: Questiontype1Component;
  let fixture: ComponentFixture<Questiontype1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Questiontype1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Questiontype1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
