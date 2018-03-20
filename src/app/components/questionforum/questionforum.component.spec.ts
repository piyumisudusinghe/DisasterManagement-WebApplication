import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionforumComponent } from './questionforum.component';

describe('QuestionforumComponent', () => {
  let component: QuestionforumComponent;
  let fixture: ComponentFixture<QuestionforumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionforumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
