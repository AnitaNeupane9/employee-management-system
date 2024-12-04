import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {APIResponseModel, IRole} from '../../model/interface/role';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-roles',
  imports: [FormsModule, NgForOf],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit{

roleList: IRole [] = [];
  // constructor(private http: HttpClient) {}  // old way: creating instance of HttpClient
  http = inject(HttpClient);         // new way

    ngOnInit(): void {
      this.getAllRoles()
    }

    getAllRoles(){
      this.http
        .get<APIResponseModel>('https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles')
        .subscribe((res:APIResponseModel) =>{
          this.roleList= res.data;
        })
    }

// // string, number, boolean, date, object, array, null, undefined
//   firstname: string = "Angular";
//   angularVersion = "Version 19";
//   version: number = 18;
//   inActive: boolean = false;
//   currentDate: Date = new Date();
//   inputType: string = "radio";
//   selectedState: string = '';
//
//
//   // Creating function
//   showWelcomeAlert(){
//     alert("Welcome Aliens!")
//   }
//
//   // Parameterized function
//   showMessage(message: string){
//     alert(message)
//   }

}
