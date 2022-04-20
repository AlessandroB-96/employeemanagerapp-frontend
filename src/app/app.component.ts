import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

//Here i define method that will be used in the app component

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanagerapp';

  //Initialized an array of Employee; need to initialize it to empty, otherwise i'll get an error!
  public employees: Employee[] = [];
  //Initialized an edited employee as Employee; need to initialize it to be Employee | undefined, otherwise i'll get an error!
  public editEmployee: Employee | undefined;
  //Initialized a deleted employee as Employee; need to initialize it to be Employee | undefined, otherwise i'll get an error!
  public deletedEmployee: Employee | undefined;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  //Method to get all employees
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //Method to add an employee; after saving an employee it will call the getEmployee method to refresh the employees view
  public onAddEmployee(addForm: NgForm): void {
    //This way i can close addEmployeeModal when i click the Save button
    document.getElementById('addEmployeeFormButton-close')?.click();
    this.employeeService.addEmployees(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  //Method to edit an employee; after saving, it will call the getEmployee method to refresh the employees view
  public onUpdateEmployee(employee: Employee): void {
    //In this way i can close addEmployeeModal when i click Save button
    this.employeeService.updateEmployees(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //Method to delete an employee; after saving, it will call the getEmployee method to refresh the employees view
  public onDeleteEmployee(employeeId: number): void {
    //In this way i can close addEmployeeModal when i click Save button
    this.employeeService.deleteEmployees(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //Method that dinamically search for employees when something is written into the search bar
  public searchEmployees(key: string): void{
    const results: Employee[] = [];
    //We are gonna loop for every employees in our Employee list: if indexof is different from -1 it means we found that employee
    for (const employee of this.employees){
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.surname.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.team.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    //Here i create a way to reset the all employees view if i don't find any employee from my research OR i have no key
    if (results.length === 0 || !key){
      this.getEmployees();
    }
  }

  //Need to set employee parameters as optional (? after the name) otherwise ill get an error passing 'null'; Update: Have to pass undefined intead of null
  public onOpenModal(mode: string, employee?: Employee): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    else if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    else if (mode === 'delete') {
      this.deletedEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  /*Method that will show a toast every time i add an employee
  public showToast():void{
    const toastTrigger = document.getElementById('liveToastBtn');
    const toastLiveExample = document.getElementById('liveToast');
    if (toastTrigger) {
      toastTrigger.addEventListener('click', function () {
      toast.show();
  }
  }*/


}
