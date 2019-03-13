import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchresultPage } from './searchresult.page';

describe('SearchresultPage', () => {
  let component: SearchresultPage;
  let fixture: ComponentFixture<SearchresultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchresultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchresultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
