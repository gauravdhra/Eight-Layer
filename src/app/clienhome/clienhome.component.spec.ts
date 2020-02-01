import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienhomeComponent } from './clienhome.component';

describe('ClienhomeComponent', () => {
  let component: ClienhomeComponent;
  let fixture: ComponentFixture<ClienhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
