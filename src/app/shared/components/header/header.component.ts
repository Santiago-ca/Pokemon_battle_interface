import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  homeActive: boolean = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToDetails(){
    this.router.navigateByUrl('/pokemon-details/-1')
    this.homeActive=false;
  }

  goToHome(){
    this.router.navigateByUrl('/');
    this.homeActive=true;
  }
}
