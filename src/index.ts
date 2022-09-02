/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

// import confetti from 'canvas-confetti';

// confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
//   resize: true,
//   useWorker: true,
// })({ particleCount: 200, spread: 200 });

import {v4 as uuidV4} from 'uuid'


type Task =  {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}


//- defining element selector with types
//- when using querySelector we use <> to define the type of html element before the id 
const list  = document.querySelector<HTMLUListElement>("#list") 
// const form = document.querySelector<HTMLFormElement>("#new-task-form")
const form = document.getElementById("new-task-form") as HTMLFormElement | null   //- we define types here that this form either should be a HTMLFormElement or null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

const tasks : Task[] = loadTasks()
tasks.forEach(addListItems)

form?.addEventListener("submit", e =>{
  e.preventDefault()

  if(input?.value =='' || input?.value == null) return 

  const newTask : Task = {
    id:uuidV4(),
    title:input.value,
    completed : false,
    createdAt : new Date()
    
  }
  tasks.push(newTask)

  addListItems(newTask)
  input.value = ''
})

//- function addListItems(task : {id : string, title : string, completed : boolean, createdAt : Date}){   --> (defining types inline)

function addListItems(task : Task) {  // defining types inline
const item = document.createElement('li')
const label = document.createElement("label")
const checkbox = document.createElement("input")
  checkbox.addEventListener("change", ()=>{
    task.completed = checkbox.checked
    saveTasks()
  })

checkbox.type = "checkbox"
checkbox.checked = task.completed
label.append(checkbox, task.title)
item?.append(label)

//- the error was occured bcoz i have written (querySelector) instead of (createElement)
// list?.append(item!)  //- added (item!) to get rid of the error
// list?.append(item ?? '')  //- (item ?? " ") to get rid of the error
// list?.append(item || "" )  //- (item || "" ) to get rid of the error

list?.append(item)  //- (item ?? "") to get rid of the error
}

function saveTasks(){
  localStorage.setItem("TASKS" , JSON.stringify(tasks))
}
function loadTasks() : Task[] {
  const tasksJSON = localStorage.getItem("TASKS")
  if(tasksJSON == null) return []

  // return JSON.parse(tasksJSON  as string)
  // return JSON.parse(localStorage.getItem("TASKS") || "")
  // return JSON.parse(localStorage.getItem("TASKS") as string)
  // return JSON.parse(localStorage.getItem("TASKS") ?? '')
  return JSON.parse(tasksJSON)
}