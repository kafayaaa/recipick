import { ComponentFixture, TestBed } from '@angular/core/testing';

import { How } from './how';

describe('How', () => {
  let component: How;
  let fixture: ComponentFixture<How>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [How]
    })
    .compileComponents();

    fixture = TestBed.createComponent(How);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
