///<reference path="../Quiz.ts"/>
///<reference path="../Undo.ts"/>
///<reference path="./Member2R.ts"/>

module SevenThree.Model {
  import IField = SevenThree.Model.IField;
  import Member = SevenThree.Model.Member;
  import Undo = SevenThree.Model.Undo;

  export class Field implements IField {
	//各参加者
	mList: Member[];
  winList: Member[];
	//問題番号
	qNum: number;
	uStack: Undo;
  border: number;

	constructor(border: number){
	    this.mList = [];
      this.winList = [];
	    this.qNum = 1;
	    this.uStack = new Undo();
      this.border = border;
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
          this.mList.splice(i,1);
          m.right = m.right + 1;
          if (m.right >= this.border) {
              m.state = State.Win;
              m.isSelected = false;
              this.winList.push(m);
          } else {
            this.mList.push(m);
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
    r = r + "|";
    for (var i = 0; i < this.winList.length; ++i) {
      r = r + this.mList[i].to_s() +"/";
    }
	  return r + "|" + this.qNum;
	}

	rewriteField(s: string): void {
    var ss: string[] = s.split("|");
    this.qNum = parseInt(ss[2]);
	  var splitted_mList: string[] = ss[0].split("/");
    var splitted_winList: string[] = ss[1].split("/");
    this.mList = [];
    this.winList = [];
	  for (var i = 0; i < splitted_mList.length; ++i) {
      if(splitted_mList[i] !== ""){
        var member: Member = new Member("",0);
        member.rewriteMember(splitted_mList[i]);
        this.mList.push(member);
		  }
	  }
    for (var i = 0; i < splitted_winList.length; ++i) {
      if(splitted_winList[i] !== ""){
        var member: Member = new Member("",0);
        member.rewriteMember(splitted_winList[i]);
        this.mList.push(member);
		  }
	  }
	}
	//Undo
	undo(): void {
	  this.rewriteField(this.uStack.undo());
	}
}
}
