import {Component, inject, OnInit} from '@angular/core';
import {MasterService} from '../../services/master.service';
import {APIResponseModel, IDesignation} from '../../model/interface/role';
import {Observable, of} from 'rxjs';
import {AsyncPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-designation',
  imports: [
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {

  masterService = inject(MasterService);
  designationList$: Observable<IDesignation[]> = this.masterService.getDesignations(); // Set Observable directly
  isLoader: boolean = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    // Subscribe and handle success/error here
    this.designationList$.subscribe(
      (data) => {
        this.isLoader = false; // Hide loader after successful data fetch
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching data.'; // Set custom error message
        this.isLoader = false; // Hide loader if error occurs
      }
    );
  }
}
