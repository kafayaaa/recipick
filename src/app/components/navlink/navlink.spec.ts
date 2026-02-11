import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navlink } from './navlink';

describe('Navlink', () => {
  let component: Navlink;
  let fixture: ComponentFixture<Navlink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navlink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navlink);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
