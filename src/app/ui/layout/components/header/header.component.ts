import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/common/auth.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarfixed: boolean = false;

  constructor(public authService: AuthService) {
    
  }
  ngOnInit(): void {
    $(function () {
      $('#slick_menu').slicknav({
        label: "",
        closedSymbol: "+",
        openedSymbol: "-",
      });
    });
  }

  @HostListener("window:scroll", ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }
}
