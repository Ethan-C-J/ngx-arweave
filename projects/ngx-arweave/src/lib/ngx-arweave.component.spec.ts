import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxArweaveComponent } from './ngx-arweave.component';

describe('NgxArweaveComponent', () => {
  let component: NgxArweaveComponent;
  let fixture: ComponentFixture<NgxArweaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxArweaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxArweaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
