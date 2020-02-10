import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { TaskService } from "src/app/task/task.service";
import { first } from "rxjs/operators";
import { Itask } from "src/app/itask";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() projectId: number;
    backlogId: any;
  //@Output() projId:EventEmitter<any> = new EventEmitter();
  isAdd: boolean = false;
  isAssign = false;
  tasks: Itask[] = [];
  taskId: any = {};
  updateTask: any = {};
  isAdmin:boolean=false;
  sendBacklogId:any;
  // to_do_tasks: Itask[] = [];
  // incomplete_tasks: Itask[] = [];
  // completed_tasks: Itask[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    if(sessionStorage.getItem('role')=='admin'){
      this.isAdmin=true;
    }
    this.isAdd = false;
    this.isAssign = false;
    this.getTasks();
  }

  addTask() {
    this.isAdd = true;
  }

  assignTask() {
    this.isAssign = true;
  }

  getPriority(priority:number){
    if(priority==1){
      return "red";
    }
    else if(priority==2){
      return "yellow";
    }
    else{
      return "green";
    }
  }

  getTasks() {
    this.updateTask={}
    
      this.taskService.getAllTasksByProjectId(this.projectId).subscribe(
      data => {
        console.log(data);
        this.tasks = data;
        this.backlogId=this.tasks[1].backlogId;
        if (sessionStorage.getItem('role') != 'admin') {
          this.tasks = this.tasks.filter(
            (x) => {
            return x.userId == sessionStorage.getItem('userId');
          })
        }
        
        // for (i = 0; i < this.tasks.length - 1; i++) {
        //   if(this.tasks[i].status=='Incomplete'){
        //     console.log("asghdf")
        //     this.incomplete_tasks.push(this.tasks[i]);
        //   }
        //   else if(this.tasks[i].status=='to_do'){
        //     console.log("asghdf")
        //     this.to_do_tasks.push(this.tasks[i]);
        //   }
        //   else{
        //     this.completed_tasks.push(this.tasks[i])
        //   }
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  showUpdateTask(task: Itask) {
    this.updateTask = task;
    this.taskId = task.taskId;
  }

  
  deleteTask(task:Itask){
    this.taskService.deleteTask(task.taskId).subscribe(
      data=>{
        console.log(data)
      },
      error=>{
        console.log(error);
      }
    );
    this.getTasks();
  }

  cancelUpdateTask() {
    this.getTasks();
  }

  onCancelAdd(){
    this.ngOnInit()
  }

}
