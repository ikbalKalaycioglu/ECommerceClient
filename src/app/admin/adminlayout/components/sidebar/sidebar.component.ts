import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router, private toastr: CustomToastrService) {

  }

  signOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.authService.identityCheck();
    this.router.navigate(["/"]);
    this.toastr.message("Çıkış Yapılıyor", "Çıkış", {
      messageType: ToastrMessageType.Warning,
      position:ToastrPosition.BottomRight
    })
  }

}
