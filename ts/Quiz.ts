//各種Interfaceの定義
module SevenThree.Model {
    //参加者の状態を表すEnumの定義
  export enum State {
	  Lose,　//失格
	  Normal, //通常状態
	  Win //勝抜
  };
  //Undo用のスタック
  export interface IUndoStack<T> {
	  undostack: T[];
	  stack(t:T): void;
	  undo(): T;
  }


    //参加者
  export interface IMember {
	//参加者のID．
	  id: number;
	//パラメーター
  //正解数
    right: number;
  //誤答数
    wrong: number;
  //状態
    state : State;
	//選択状態にあるかどうか
	  isSelected: boolean;

	  to_s()                       : string;
	  rewriteMember(s: string)     : void;
  }
    //全体
  export interface IField {
	//参加者のリスト
	  mList: IMember[];
	//問題番号
	  qNum: number;
	//Undo用のスタック
	  uStack: IUndoStack<string>;
	//メンバーの追加
	  addMember(m: IMember): void;
	//参加者の選択状態を取得
	  getSelected(): boolean[];
	//全参加者の選択状態をリセット
	  resetSelected(): void;
	//正解
	  answerRight(): void;
	//誤答
	  answerWrong(): void;
  //スルー
    through(): void;

	  to_s(): string;
	  rewriteField(s: string): void;
	//Undo
	  undo(): void;
  }
}
