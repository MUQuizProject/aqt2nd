///<reference path="../../typings/angularjs/angular.d.ts" />
///<reference path='../Quiz.ts'/>
///<reference path='MemberF.ts'/>
///<reference path="FieldF.ts"/>
///<reference path='ControllerF.ts' />


module SevenThree {
	angular.module("seventhree",[])
	.service("field",SevenThree.Model.Field)
	.controller("fieldcontroller",SevenThree.Controller);
}
