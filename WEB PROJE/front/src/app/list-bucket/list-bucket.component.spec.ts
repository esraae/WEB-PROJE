import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBucketComponent } from './list-bucket.component';

describe('ListBucketComponent', () => {
  let component: ListBucketComponent;
  let fixture: ComponentFixture<ListBucketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBucketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
