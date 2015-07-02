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
