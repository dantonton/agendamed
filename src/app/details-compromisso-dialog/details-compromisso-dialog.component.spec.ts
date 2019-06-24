import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCompromissoDialogComponent } from './details-compromisso-dialog.component';

describe('DetailsCompromissoDialogComponent', () => {
  let component: DetailsCompromissoDialogComponent;
  let fixture: ComponentFixture<DetailsCompromissoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCompromissoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCompromissoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
