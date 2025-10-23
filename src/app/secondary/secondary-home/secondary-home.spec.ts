import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryHome } from './secondary-home';

describe('SecondaryHome', () => {
  let component: SecondaryHome;
  let fixture: ComponentFixture<SecondaryHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondaryHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
