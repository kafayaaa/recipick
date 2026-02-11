import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickButton } from './pick-button';

describe('PickButton', () => {
  let component: PickButton;
  let fixture: ComponentFixture<PickButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
