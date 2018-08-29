import { Component, OnInit } from '@angular/core';
import { TrackerBase, BaseQuestions, TrackerQuestion, TrackerFieldOptions } from '../../../trackers/trackers.model';



@Component({
  selector: 'app-form-new-tracker',
  templateUrl: './form-new-tracker.component.html',
  styleUrls: ['./form-new-tracker.component.scss']
})
export class FormNewTrackerComponent implements OnInit {
  baseKeys;
  baseValues;
  baseObj;
  showQuestions = false;
  baseQuestions: Array<TrackerQuestion>;
  position = 0;
  fieldOptions; 

  constructor() { 
    
  }

  ngOnInit() {
    this.baseQuestions = BaseQuestions.map(question => 
      { 
        question.position = this.position++;
        return question ;
      }
    );

    this.fieldOptions = TrackerFieldOptions;
  }

  addEmptyQuestion() {
    let newQuestion: TrackerQuestion = {
      position: this.position++,
      label: 'New Question',
      type: 'text',
      validation: {
        required: false
      },
      noEdits: false
    }
    this.baseQuestions.push(newQuestion);
  }

  removeQuestion(quest: TrackerQuestion) {
    this.baseQuestions.splice(this.baseQuestions.indexOf(quest), 1);
  }

  saveTracker() {
    console.log(this.baseQuestions);
  }

}

