
/// <reference path="./Quiz.ts"/>

module SevenThree.Model {
  import IUndoStack = SevenThree.Model.IUndoStack;

  export class Undo implements IUndoStack<string> {
	  undostack: string[];

	  constructor(){
	    this.undostack = [];
	  }

	  stack(t: string):void {
	    this.undostack.push(t);
	  }

	  undo(): string {
	    return this.undostack.pop();
	  }
  }
}
