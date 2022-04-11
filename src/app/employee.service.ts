import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Import of library rxJs, with this library i can use Observables
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //String where to put the server URL
  private apiServerUrl = ''

  constructor(private http: HttpClient) { }

  //Method that request all the objects Employees; its type is Observable
  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
    //${} it's used to pass parameters, in this case apiServerUrl
  }

  //Method that request to add an object Employee; its type is Observable
  public addEmployees(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  //Method that request to update an object Employee; its type is Observable  
  public updateEmployees(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  //Method that request to delete an object Employee passing its Id; its type is Observable  
  public deleteEmployees(employeeId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }

}
