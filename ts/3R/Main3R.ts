///<reference path="../../typings/angularjs/angular.d.ts" />
///<reference path='../Quiz.ts'/>
///<reference path='Member3R.ts'/>
///<reference path="Field3R.ts"/>
///<reference path='Controller3R.ts' />


module SevenThree {
	angular.module("seventhree",[])
	.service("field",SevenThree.Model.Field)
	.controller("fieldcontroller",SevenThree.Controller);
}
