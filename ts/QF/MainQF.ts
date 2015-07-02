///<reference path="../../typings/angularjs/angular.d.ts" />
///<reference path='../Quiz.ts'/>
///<reference path='MemberQF.ts'/>
///<reference path="FieldQF.ts"/>
///<reference path='ControllerQF.ts' />


module SevenThree {
	angular.module("seventhree",[])
	.service("field",SevenThree.Model.Field)
	.controller("fieldcontroller",SevenThree.Controller);
}
