import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpsComponent } from './rps.component';

describe('RpsComponent', () => {
  let component: RpsComponent;
  let fixture: ComponentFixture<RpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
