import {Component, inject, OnInit} from '@angular/core';
import {Client} from '../../model/class/client';
import {FormsModule} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {APIResponseModel} from '../../model/interface/role';

@Component({
  selector: 'app-client',
  imports: [
    FormsModule
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{
  clientObj: Client = new Client();
  clientList: Client[] = [];
  clientService = inject(ClientService);

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(){
    this.clientService.getAllClients().subscribe((result: APIResponseModel)=> {
      this.clientList = result.data;
    });
  }

  onSaveClient() {
    debugger;
    this.clientService.addUpdate(this.clientObj).subscribe((res: APIResponseModel) =>{
      if (res.result){
        alert('Client saved Successfully.');
        this.loadClient();
        this.clientObj = new Client();
      } else {
        alert(res.message)
      }
    })
  }


  onEdit(data: Client) {
    this.clientObj = data;
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete client?");
    if (isDelete) {
      this.clientService.deleteClientById(id).subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert('Client deleted Successfully.');
          this.loadClient();
          this.clientObj = new Client();
        } else {
          alert(res.message)
        }
      })
    }
  }

}
