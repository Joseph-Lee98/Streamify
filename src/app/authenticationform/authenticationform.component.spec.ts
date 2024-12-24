import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationformComponent } from './authenticationform.component';

describe('AuthenticationformComponent', () => {
  let component: AuthenticationformComponent;
  let fixture: ComponentFixture<AuthenticationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthenticationformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
