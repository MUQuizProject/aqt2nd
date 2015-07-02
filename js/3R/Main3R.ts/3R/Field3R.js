///<reference path="../Quiz.ts"/>
///<reference path="../Undo.ts"/>
///<reference path="./Member3R.ts"/>
var SevenThree;
(function (SevenThree) {
    var Model;
    (function (Model) {
        var Undo = SevenThree.Model.Undo;
        var Field = (function () {
            function Field(win_border, lose_border) {
                this.mList = [];
                this.qNum = 1;
                this.uStack = new Undo();
                this.win_border = win_border;
                this.lose_border = lose_border;
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
                        m.right = m.right + 1;
                        if (m.right >= this.win_border) {
                            m.state = Model.State.Win;
                            m.isSelected = false;
                        }
                    }
                }
                this.qNum++;
                this.resetSelected();
            };
            Field.prototype.through = function () {
                this.qNum++;
            };
            //選択状態にあるプレーヤーが誤答した場合の挙動
            Field.prototype.answerWrong = function () {
                this.uStack.stack(this.to_s());
                var sList = this.getSelected();
                for (var i = 0; i < sList.length; i++) {
                    if (sList[i]) {
                        var m = this.mList[i];
                        m.wrong = m.wrong + 1;
                        if (m.wrong >= this.lose_border) {
                            m.state = Model.State.Lose;
                            m.isSelected = false;
                        }
                    }
                }
                this.qNum++;
                this.resetSelected();
            };
            Field.prototype.to_s = function () {
                //各参加者のMember#to_sの結果をスラッシュでつないでいます．
                var r = "";
                for (var i = 0; i < this.mList.length; ++i) {
                    r = r + this.mList[i].to_s() + "/";
                }
                return r;
            };
            Field.prototype.rewriteField = function (s) {
                var splitted = s.split("/");
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
