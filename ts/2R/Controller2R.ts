///<reference path="../../typings/angularjs/angular.d.ts" />
///<reference path="../Quiz.ts" />
///<reference path="./Member2R.ts" />
///<reference path="./Field2R.ts"/>


module SevenThree {
    //画面状態．
  import Member = SevenThree.Model.Member;
  import Field = SevenThree.Model.Field;

  export enum Mode {
	  Input, //入力画面
	  Playing //プレー画面
  }

  export class Controller {
    idtext: string;
	  name: string;
	  inputText: string;
	  field: Field;
    mode: Mode;
    tempMems: Member[];

    constructor(){
      this.field = new Field(3);
      this.tempMems = [new Member("武田信玄",1),new Member("上杉謙信",2),new Member("石田三成",3),new Member("豊臣秀吉",4),new Member("織田信長",5),new Member("明智光秀",6)];
      this.mode = Mode.Input;
    }

    addMemberTemporally(): void {
      var byLine: string[] = this.inputText.split("\n");
      for (let i = 0; i < byLine.length; i++) {
          var spTxt: string[] = byLine[i].split(",");
          var m: Member = new Member(spTxt[1],parseInt(spTxt[0]));
          this.tempMems.push(m);
      }
    }

    deleteAllMembers(): void {
      this.tempMems = [];
    }

    confirmMembers(): void {
      this.field.resetMembers();
      for (let i = 0; i < this.tempMems.length; i++) {
          this.field.addMember(this.tempMems[i]);
      }
    }

    toggleSelected(member: Member): void {
      console.log("toggleSelected");
      this.field.toggleSelected(member.id);
    }

    onKeyDown(e: KeyboardEvent): void {
      console.log(e.which);
      switch(e.which) {
        case 79:
          this.field.answerRight();
          break;
        case 84:
          this.field.through();
          break;
        case 85:
          this.field.undo();
          break;
        default:
          break;
      }
    }
  }
}
