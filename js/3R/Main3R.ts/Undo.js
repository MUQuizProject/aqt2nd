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
