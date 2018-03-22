import { VariableNameConstants } from '../Constants/VariableNameConstants';

// tslint:disable:typedef
declare var global;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SubArray = /** @class */ (function (_super) {
    __extends(SubArray, _super);
    function SubArray() {
        return this;
    }
    return SubArray;
}(Array));
global[VariableNameConstants.SubArray] = SubArray;
