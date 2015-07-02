///<reference path="../Quiz.ts"/>
///<reference path="../Undo.ts"/>
///<reference path="./MemberQF.ts"/>

module SevenThree.Model {
  import IField = SevenThree.Model.IField;
  import Member = SevenThree.Model.Member;
  import Undo = SevenThree.Model.Undo;

  export enum Phase {
    A,
    B
  };

  export class Field implements IField {
	//各参加者
	mList: Member[];
	//問題番号
	qNum: number;
	uStack: Undo;
  phase: Phase;
  B_point: number;

	constructor(){
      this.phase = Phase.A;
	    this.mList = [];
	    this.qNum = 1;
	    this.uStack = new Undo();
      this.B_point = 1;
	}
  
  setPhase(phase: Phase): void {
    this.phase = phase;
  }

  setBPoint(bp: number): void {
    this.B_point = bp;
    console.log(this.B_point);
  }
	//参加者の追加
	addMember(m: Member): void {this.mList.push(m);}
	//参加者をリセット
	resetMembers(): void {this.mList = [];}

	//idで指定された参加者の選択状態をトグルする
	toggleSelected(id: number): void {
	  for (var i = 0; i < this.mList.length; ++i) {
		  if(this.mList[i].id === id){
        var b = this.mList[i].isSelected;
        console.log(b);
        this.mList[i].isSelected = !b;
		  }
	  };
	}

	getSelected(): boolean[]{
	  var r: boolean[] = [];
	  for (var i = 0; i < this.mList.length; ++i) {
		  r.push(this.mList[i].isSelected);
	  }
	  return r;
	}
	//全参加者の選択状態をリセット
	resetSelected(): void{
	  for (var i = 0; i < this.mList.length; ++i) {
		  this.mList[i].isSelected = false;
	  }
	}
	//選択状態にあるプレーヤーが正解した場合の挙動
	answerRight(): void {
	  this.uStack.stack(this.to_s());
	  var sList: boolean[] = this.getSelected();
    for (let i = 0; i < sList.length; i++) {
        if(sList[i]){
          var m: Member = this.mList[i];
          if(this.phase === Phase.A){
            m.right = m.right + 1;
          } else {
            m.right = m.right + this.B_point;
          }
        }
    }
	  this.qNum++;
	  this.resetSelected();
	}

  through(): void {
    this.uStack.stack(this.to_s());
    this.qNum++;
  }
	//選択状態にあるプレーヤーが誤答した場合の挙動
	answerWrong(): void {}

	to_s(): string {
	  //各参加者のMember#to_sの結果をスラッシュでつないでいます．
	  var r: string = "";
	  for (var i = 0; i < this.mList.length; ++i) {
		  r = r + this.mList[i].to_s() + "/";
	  }
	  return r + "|" + this.qNum;
	}

	rewriteField(s: string): void {
    var ss: string[] = s.split("|");
    this.qNum = parseInt(ss[1]);
	  var splitted: string[] = ss[0].split("/");
	  for (var i = 0; i < splitted.length; ++i) {
		  if(splitted[i] !== ""){
		    this.mList[i].rewriteMember(splitted[i]);
		  }
	  }
	}
	//Undo
	undo(): void {
	  this.rewriteField(this.uStack.undo());
	}
}
}
