///<reference path="../../typings/angularjs/angular.d.ts" />
///<reference path='../Quiz.ts'/>
///<reference path='MemberSF.ts'/>
///<reference path="FieldSF.ts"/>
///<reference path='ControllerSF.ts' />


module SevenThree {
	angular.module("seventhree",[])
	.service("field",SevenThree.Model.Field)
	.controller("fieldcontroller",SevenThree.Controller);
}
