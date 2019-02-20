import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSearchPage } from './word-search.page';

describe('WordSearchPage', () => {
  let component: WordSearchPage;
  let fixture: ComponentFixture<WordSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
