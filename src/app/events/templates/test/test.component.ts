import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  @Input() personSurname: string;
  @Output() personNameChange = new EventEmitter<string>();
  onNameChange(model: string){
       
      this.personSurname = model;
      this.personNameChange.emit(model);
  }

  quantity: number = 0;
 plus() { 
   this.quantity++; 
  }
 minus() { 
   this.quantity--; 
  }

  ngOnInit() {
  }

  ages: number = 20;

}
