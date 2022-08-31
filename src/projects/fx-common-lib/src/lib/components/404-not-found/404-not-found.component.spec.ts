import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFound404Component } from './404-not-found.component';

describe('404NotFoundComponent', () => {
  let component: NotFound404Component;
  let fixture: ComponentFixture<NotFound404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFound404Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFound404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
