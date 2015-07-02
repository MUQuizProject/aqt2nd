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
                this.wrong = 0;
                this.state = Model.State.Normal;
                this.isSelected = false;
            }
            Member.prototype.to_s = function () {
                return this.id + "," + this.name + "," + this.right + "," + this.wrong + "," + this.state;
            };
            Member.prototype.rewriteMember = function (s) {
                var ss = s.split(",");
                this.id = parseInt(ss[0]);
                this.name = ss[1];
                this.right = parseInt(ss[2]);
                this.wrong = parseInt(ss[3]);
                this.state = parseInt(ss[4]);
            };
            return Member;
        })();
        Model.Member = Member;
    })(Model = SevenThree.Model || (SevenThree.Model = {}));
})(SevenThree || (SevenThree = {}));
