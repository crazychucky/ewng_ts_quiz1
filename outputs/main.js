"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
var Operator;
(function (Operator) {
    Operator[Operator["Add"] = 0] = "Add";
    Operator[Operator["Sub"] = 1] = "Sub";
})(Operator || (Operator = {}));
;
class RandomUtil {
    // 构造函数 
    constructor(seed = 12345) {
        this._pa = 149;
        this._pc = 577;
        this._pm = 960587;
        this.seed = seed;
    }
    random() {
        let ret = (this._pa * this.seed + this._pc) % this._pm; //range 0~pm-1
        this.seed = ret;
        return ret;
    }
}
class RandomEquation {
    // 构造函数 
    constructor(seed = 123456) {
        this.a = 0;
        this.b = 0;
        this.result = 0;
        this.question = "";
        this.op = Operator.Add;
        this.rd = new RandomUtil(seed);
        this.refresh();
    }
    refresh() {
        this.a = this.genNum();
        this.b = this.genNum();
        this.op = this.genOp();
        if (this.op == Operator.Sub) {
            if (this.a < this.b) {
                let tmp = this.a;
                this.a = this.b;
                this.b = tmp;
            }
        }
        let qStr = this.a.toString();
        if (this.op == Operator.Add) {
            qStr = qStr + ' + ';
            this.result = this.a + this.b;
        }
        else {
            qStr = qStr + ' - ';
            this.result = this.a - this.b;
        }
        qStr = qStr + this.b.toString() + ' = ?\ninput your answer:';
        this.question = qStr;
    }
    isRight(r) {
        return this.result == r;
    }
    genOp() {
        let tmp = this.rd.random();
        let ret = tmp % 2 + Operator.Add;
        return ret;
    }
    genNum() {
        let tmp = this.rd.random();
        let ret = tmp % 5 + 1;
        return ret;
    }
}
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let eq = new RandomEquation();
let cnt = 1;
let total = 3;
let point = 0;
console.log('Quiz Begin!');
var recursiveAsyncReadLine = function () {
    rl.question(eq.question, function (answer) {
        let input = Number(answer);
        let isAnswerRight = false;
        if (!isNaN(input)) {
            if (eq.isRight(input)) {
                isAnswerRight = true;
            }
        }
        if (isAnswerRight) {
            point++;
            console.log('Right! now Point:' + point);
        }
        else {
            console.log('Wrong! now Point:' + point);
        }
        if (cnt >= total) {
            console.log("quiz ends!");
            return rl.close(); //closing RL and returning from function.
        }
        cnt = cnt + 1;
        eq.refresh();
        recursiveAsyncReadLine(); //Calling this function again to ask new question
    });
};
recursiveAsyncReadLine(); //we have to actually start our recursion somehow
//# sourceMappingURL=main.js.map