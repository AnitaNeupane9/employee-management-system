import {Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {APIResponseModel, ClientProject, Employee} from '../../model/interface/role';
import {Client} from '../../model/class/client';
import {DatePipe} from '@angular/common';
import {AlertComponent} from '../../reusableComponent/alert/alert.component';

@Component({
  selector: 'app-client-project',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    AlertComponent
  ],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit{

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl(""),
    startDate: new FormControl("") ,
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    contactPersonEmailId: new FormControl(""),
    totalEmpWorking: new FormControl(0),
    projectCost: new FormControl(0),
    projectDetails: new FormControl(""),
    clientId: new FormControl("")
  });

  clientService = inject(ClientService)
  employeeList: Employee[] = [];
  clientList: Client[] = [];

  firstName = signal("Angular");
  projectList = signal<ClientProject[]>([])

  ngOnInit() {
    this.getALlClient();
    this.getAllEmployee();
    this.getAllClientProject();
  }

  getAllEmployee(){
    this.clientService.getAllEmployee().subscribe((res:APIResponseModel) => {
      this.employeeList = res.data;
    })
  }

  getAllClientProject(){
    this.clientService.getAllClientProject().subscribe((res:APIResponseModel) => {
      this.projectList.set(res.data);
    })
  }


  getALlClient(){
    this.clientService.getAllClients().subscribe((res:APIResponseModel) => {
      this.clientList = res.data;
    })
  }

  onSaveProject() {
    const formValue = this.projectForm.value;
    debugger;
    this.clientService.addUpdateClientProject(formValue).subscribe((res: APIResponseModel) =>{
      if (res.result){
        alert('Project Created Successfully.')
      } else{
        alert(res.message);
      }
    })
  }

  // Changing signal value
  changeFName() {
    this.firstName.set('React')
  }
}
