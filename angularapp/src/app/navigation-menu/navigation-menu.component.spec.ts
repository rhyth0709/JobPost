import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavigationMenuComponent } from './navigation-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('NavigationMenuComponent', () => {
  let component: NavigationMenuComponent;
  let fixture: ComponentFixture<NavigationMenuComponent>;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationMenuComponent],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(NavigationMenuComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  fit('NavigationMenuComponent should create the NavigationMenu component', () => {
    expect(component).toBeTruthy();
  });

  fit('NavigationMenuComponent should render navigation links', () => {
    const links = fixture.debugElement.queryAll(By.css('.nav-item'));

    expect(links.length).toBe(4); // Adjust the count based on your actual links
    expect(links[0].nativeElement.textContent).toContain('Posts');
    expect(links[1].nativeElement.textContent).toContain('Applications');
    expect(links[2].nativeElement.textContent).toContain('Create Job');
    expect(links[3].nativeElement.textContent).toContain('Apply Job');
  });

  // fit('should navigate to /view-post when "Posts" link is clicked', fakeAsync(() => {
  //   const link = fixture.debugElement.query(By.css('a[routerLink="/view-post"]'));

  //   link.triggerEventHandler('click', null);
  //   fixture.detectChanges();

  //   tick(); // Simulate the passage of time

  //   fixture.whenStable().then(() => {
  //     expect(location.path()).toBe('/view-post');
  //   });
  // }));

  // fit('should navigate to /view-appli when "Applications" link is clicked', () => {
  //   const link = fixture.debugElement.query(By.css('a[routerLink="/view-appli"]'));

  //   link.triggerEventHandler('click', null);
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(location.path()).toBe('/view-appli');
  //   });
  // });

  // fit('should navigate to /post-form when "Create Job" link is clicked', () => {
  //   const link = fixture.debugElement.query(By.css('a[routerLink="/post-form"]'));

  //   link.triggerEventHandler('click', null);
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(location.path()).toBe('/post-form');
  //   });
  // });

  // fit('should navigate to /job-applications when "Apply Job" link is clicked', () => {
  //   const link = fixture.debugElement.query(By.css('a[routerLink="/job-applications"]'));

  //   link.triggerEventHandler('click', null);
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(location.path()).toBe('/job-applications');
  //   });
  // });
});
