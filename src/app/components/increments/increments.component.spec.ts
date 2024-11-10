import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementsComponent } from './increments.component';

describe('IncrementsComponent', () => {
  let component: IncrementsComponent;
  let fixture: ComponentFixture<IncrementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncrementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncrementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
