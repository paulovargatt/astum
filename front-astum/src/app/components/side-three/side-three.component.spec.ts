import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideThreeComponent } from './side-three.component';

describe('SideThreeComponent', () => {
  let component: SideThreeComponent;
  let fixture: ComponentFixture<SideThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
