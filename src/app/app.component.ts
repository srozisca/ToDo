import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDo } from 'src/models/toDo.model';

@Component({
  selector: 'app-root', //transforma numa tag <app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//o export torna a classe pública
export class AppComponent {
  public mode: string = 'list';
  public toDos: ToDo[] = []; //vazio
  //public toDos: any[]; //undefined
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();

    // this.toDos.push(new ToDo(1, 'Passear com o cachorro', false));
    // this.toDos.push(new ToDo(2, 'Ir ao mercado', false));
    // this.toDos.push(new ToDo(3, 'Cortar ao cabelo', true));
  }

  add() {
    //this.form.value => { title: 'Titulo' }
    const title = this.form.controls['title'].value;
    const id = this.toDos.length + 1;
    this.toDos.push( new ToDo(id,title,false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(toDo: ToDo) {
    const index = this.toDos.indexOf(toDo);
    if(index != -1) {
      this.toDos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(toDo: ToDo) {
    toDo.done = true;
    this.save();
  }

  markAsUndone(toDo: ToDo) {
    toDo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.toDos);
    localStorage.setItem('toDos', data);
  }

  load() {
    const data = localStorage.getItem('toDos');
    if(data)
      this.toDos = JSON.parse(data);
    else
      this.toDos = [];
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}

