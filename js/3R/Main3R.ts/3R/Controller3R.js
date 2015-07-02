///<reference path="../../typings/angularjs/angular.d.ts" />
///<reference path="../Quiz.ts" />
///<reference path="./Member3R.ts" />
///<reference path="./Field3R.ts"/>
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
            this.field = new Field(7, 3);
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
                case 88:
                    this.field.answerWrong();
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
        };
        return Controller;
    })();
    SevenThree.Controller = Controller;
})(SevenThree || (SevenThree = {}));
