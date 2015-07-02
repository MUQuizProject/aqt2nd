//各種Interfaceの定義
var SevenThree;
(function (SevenThree) {
    var Model;
    (function (Model) {
        //参加者の状態を表すEnumの定義
        (function (State) {
            State[State["Lose"] = 0] = "Lose";
            State[State["Normal"] = 1] = "Normal";
            State[State["Win"] = 2] = "Win"; //勝抜
        })(Model.State || (Model.State = {}));
        var State = Model.State;
        ;
    })(Model = SevenThree.Model || (SevenThree.Model = {}));
})(SevenThree || (SevenThree = {}));
/// <reference path="../Quiz.ts"/>
var SevenThree;
(function (SevenThree) {
    var Model;
    (function (Model) {
        var Member = (function () {
            function Member(name, id) {
                this.id = id;
                this.name = name;
                this.right = 0;
                this.state = Model.State.Normal;
                this.isSelected = false;
            }
            Member.prototype.to_s = function () {
                return this.id + "," + this.name + "," + this.right + "," + this.state;
            };
            Member.prototype.rewriteMember = function (s) {
                var ss = s.split(",");
                this.id = parseInt(ss[0]);
                this.name = ss[1];
                this.right = parseInt(ss[2]);
                this.state = parseInt(ss[3]);
            };
            return Member;
        })();
        Model.Member = Member;
    })(Model = SevenThree.Model || (SevenThree.Model = {}));
})(SevenThree || (SevenThree = {}));
/// <reference path="./Quiz.ts"/>
var SevenThree;
(function (SevenThree) {
    var Model;
    (function (Model) {
        var Undo = (function () {
            function Undo() {
                this.undostack = [];
            }
            Undo.prototype.stack = function (t) {
                this.undostack.push(t);
            };
            Undo.prototype.undo = function () {
                return this.undostack.pop();
            };
            return Undo;
        })();
        Model.Undo = Undo;
    })(Model = SevenThree.Model || (SevenThree.Model = {}));
})(SevenThree || (SevenThree = {}));
///<reference path="../Quiz.ts"/>
///<reference path="../Undo.ts"/>
///<reference path="./MemberF.ts"/>
var SevenThree;
(function (SevenThree) {
    var Model;
    (function (Model) {
        var Undo = SevenThree.Model.Undo;
        var Field = (function () {
            function Field() {
                this.mList = [];
                this.qNum = 1;
                this.uStack = new Undo();
            }
            //参加者の追加
            Field.prototype.addMember = function (m) { this.mList.push(m); };
            //参加者をリセット
            Field.prototype.resetMembers = function () { this.mList = []; };
            //idで指定された参加者の選択状態をトグルする
            Field.prototype.toggleSelected = function (id) {
                for (var i = 0; i < this.mList.length; ++i) {
                    if (this.mList[i].id === id) {
                        var b = this.mList[i].isSelected;
                        console.log(b);
                        this.mList[i].isSelected = !b;
                    }
                }
                ;
            };
            Field.prototype.getSelected = function () {
                var r = [];
                for (var i = 0; i < this.mList.length; ++i) {
                    r.push(this.mList[i].isSelected);
                }
                return r;
            };
            //全参加者の選択状態をリセット
            Field.prototype.resetSelected = function () {
                for (var i = 0; i < this.mList.length; ++i) {
                    this.mList[i].isSelected = false;
                }
            };
            //選択状態にあるプレーヤーが正解した場合の挙動
            Field.prototype.answerRight = function () {
                this.uStack.stack(this.to_s());
                var sList = this.getSelected();
                for (var i = 0; i < sList.length; i++) {
                    if (sList[i]) {
                        var m = this.mList[i];
                        m.right = m.right + 3;
                    }
                }
            };
            Field.prototype.answerBonus = function () {
                this.uStack.stack(this.to_s());
                var sList = this.getSelected();
                for (var i = 0; i < sList.length; i++) {
                    if (sList[i]) {
                        var m = this.mList[i];
                        m.right = m.right + 1;
                    }
                }
            };
            Field.prototype.through = function () {
                this.uStack.stack(this.to_s());
                this.qNum++;
            };
            //選択状態にあるプレーヤーが誤答した場合の挙動
            Field.prototype.answerWrong = function () {
                this.uStack.stack(this.to_s());
                var sList = this.getSelected();
                for (var i = 0; i < sList.length; i++) {
                    if (sList[i]) {
                        var m = this.mList[i];
                        m.right = m.right - 3;
                    }
                }
                this.qNum++;
                this.resetSelected();
            };
            Field.prototype.goNextQuestion = function () {
                this.uStack.stack(this.to_s());
                this.qNum++;
                this.resetSelected();
            };
            Field.prototype.to_s = function () {
                //各参加者のMember#to_sの結果をスラッシュでつないでいます．
                var r = "";
                for (var i = 0; i < this.mList.length; ++i) {
                    r = r + this.mList[i].to_s() + "/";
                }
                return r + "|" + this.qNum;
            };
            Field.prototype.rewriteField = function (s) {
                var ss = s.split("|");
                this.qNum = parseInt(ss[1]);
                var splitted = ss[0].split("/");
                for (var i = 0; i < splitted.length; ++i) {
                    if (splitted[i] !== "") {
                        this.mList[i].rewriteMember(splitted[i]);
                    }
                }
            };
            //Undo
            Field.prototype.undo = function () {
                this.rewriteField(this.uStack.undo());
            };
            return Field;
        })();
        Model.Field = Field;
    })(Model = SevenThree.Model || (SevenThree.Model = {}));
})(SevenThree || (SevenThree = {}));
///<reference path="../../typings/angularjs/angular.d.ts" />
///<reference path="../Quiz.ts" />
///<reference path="./MemberF.ts" />
///<reference path="./FieldF.ts"/>
var SevenThree;
(function (SevenThree) {
    //画面状態．
    var Member = SevenThree.Model.Member;
    var Field = SevenThree.Model.Field;
    (function (Mode) {
        Mode[Mode["Input"] = 0] = "Input";
        Mode[Mode["Playing"] = 1] = "Playing"; //プレー画面
    })(SevenThree.Mode || (SevenThree.Mode = {}));
    var Mode = SevenThree.Mode;
    var Controller = (function () {
        function Controller() {
            this.field = new Field();
            this.tempMems = [new Member("武田信玄", 1), new Member("上杉謙信", 2), new Member("石田三成", 3), new Member("豊臣秀吉", 4), new Member("織田信長", 5), new Member("明智光秀", 6)];
            this.mode = Mode.Input;
        }
        Controller.prototype.addMemberTemporally = function () {
            var byLine = this.inputText.split("\n");
            for (var i = 0; i < byLine.length; i++) {
                var spTxt = byLine[i].split(",");
                var m = new Member(spTxt[1], parseInt(spTxt[0]));
                this.tempMems.push(m);
            }
        };
        Controller.prototype.deleteAllMembers = function () {
            this.tempMems = [];
        };
        Controller.prototype.confirmMembers = function () {
            this.field.resetMembers();
            for (var i = 0; i < this.tempMems.length; i++) {
                this.field.addMember(this.tempMems[i]);
            }
        };
        Controller.prototype.toggleSelected = function (member) {
            console.log("toggleSelected");
            this.field.toggleSelected(member.id);
        };
        Controller.prototype.onKeyDown = function (e) {
            console.log(e.which);
            switch (e.which) {
                case 79:
                    this.field.answerRight();
                    break;
                case 66:
                    this.field.answerBonus();
                    break;
                case 88:
                    this.field.answerWrong();
                    break;
                case 84:
                    this.field.through();
                    break;
                case 78:
                    this.field.goNextQuestion();
                    break;
                case 85:
                    this.field.undo();
                    break;
                default:
                    break;
            }
        };
        return Controller;
    })();
    SevenThree.Controller = Controller;
})(SevenThree || (SevenThree = {}));
///<reference path="../../typings/angularjs/angular.d.ts" />
///<reference path='../Quiz.ts'/>
///<reference path='MemberF.ts'/>
///<reference path="FieldF.ts"/>
///<reference path='ControllerF.ts' />
var SevenThree;
(function (SevenThree) {
    angular.module("seventhree", [])
        .service("field", SevenThree.Model.Field)
        .controller("fieldcontroller", SevenThree.Controller);
})(SevenThree || (SevenThree = {}));
