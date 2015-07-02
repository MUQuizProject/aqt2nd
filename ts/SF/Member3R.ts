/// <reference path="../Quiz.ts"/>

module SevenThree.Model {
  //パラメーター
  import IMember = SevenThree.Model.IMember;

  export class Member implements IMember{
    id: number;
    name: string;
    right: number;
    wrong: number;
    state: State;
    isSelected: boolean;

    constructor(name: string, id: number){
      this.id = id;
      this.name = name;
      this.right = 30;
      this.state = State.Normal;
      this.isSelected = false;
    }

    to_s(): string {
      return this.id + "," + this.name + "," + this.right + "," + this.state;
    }

    rewriteMember(s: string): void {
      var ss = s.split(",");
      this.id = parseInt(ss[0]);
      this.name = ss[1];
      this.right = parseInt(ss[2]);
      this.state = parseInt(ss[3]);
    }
  }
}
