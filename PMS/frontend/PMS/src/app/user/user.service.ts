import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IUser } from "src/app/iuser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl:string="http://localhost:3000/routes/users/";
  
   getUserList(){
    return this.http.get<any>(this.baseUrl);
  }
  
  getUserById(userId:number){
    return this.http.get<IUser>(this.baseUrl + userId);
  }
  
  registerUser(user:IUser){
    return this.http.post(this.baseUrl+"add", user);
  }

  deleteUser(userId:number){
    return this.http.delete(this.baseUrl+"delete/"+userId)
  }
  updateUser(user:IUser){
    return this.http.put(this.baseUrl+"update/"+ user.id, user);
  }
}
