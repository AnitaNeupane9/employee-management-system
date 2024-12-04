import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {APIResponseModel, Employee} from '../../model/interface/role';
import {Client} from '../../model/class/client';

@Component({
  selector: 'app-client-project',
  imports: [
    FormsModule,
    ReactiveFormsModule
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

  ngOnInit() {
    this.getALlClient();
    this.getAllEmployee();
  }

  getAllEmployee(){
    this.clientService.getAllEmployee().subscribe((res:APIResponseModel) => {
      this.employeeList = res.data;
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
}
