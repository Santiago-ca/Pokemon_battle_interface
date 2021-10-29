import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-search',
  template: `
  <input
  #inputSearch
  autofocus
  type="text"
  class="form-control-lg"
  placeholder="Search a pokemon"
  (keyup)="onSearch(inputSearch.value)"
  />
  `,
  styles: ['input {width:100%;}']
})
export class FormSearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSearch(value: String){
    if(value && value.length>3){
      this.router.navigate(['/pokemon-list'],{
        queryParams:{q:value}
      })
    }
  }
}
