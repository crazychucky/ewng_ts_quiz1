import { randomBytes } from 'crypto';
import * as readline from 'readline';

enum Operator {Add, Sub};
class RandomUtil {
  seed:number; 
  _pa:number = 149;
  _pc:number = 577;
  _pm:number = 960587;
 
  // 构造函数 
  constructor(seed:number = 12345) { 
      this.seed = seed; 
  }  
  random():number { 
    let ret = (this._pa*this.seed+this._pc)%this._pm;  //range 0~pm-1
    this.seed = ret;
    return ret;
  } 
}

class RandomEquation {
  // 字段 
  rd:RandomUtil;
  a:number = 0;
  b:number = 0;
  result:number = 0;
  question:string = "";
  op:Operator = Operator.Add;
 
  // 构造函数 
  constructor(seed:number = 123456) { 
    this.rd = new RandomUtil(seed);
    this.refresh()
  }  
  refresh():void { 
    this.a = this.genNum();
    this.b = this.genNum();
    this.op = this.genOp();
    if(this.op == Operator.Sub){
      if(this.a < this.b){
        let tmp = this.a;
        this.a = this.b;
        this.b = tmp;
      }
    }

    let qStr:string = this.a.toString();
    if(this.op == Operator.Add){
      qStr = qStr + ' + ';
      this.result = this.a + this.b;
    }
    else{
      qStr = qStr + ' - ';
      this.result = this.a - this.b;
    }
    qStr = qStr + this.b.toString() + ' = ?\ninput your answer:'
    this.question = qStr;
  } 
  isRight(r:number):boolean { 
    return this.result == r;
  }
  genOp():Operator { 
    let tmp = this.rd.random()
    let ret = tmp%2 + Operator.Add;
    return ret
  } 
  genNum():number { 
    let tmp = this.rd.random()
    let ret = tmp%5 + 1;
    return ret
  } 
}

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let timestamp = new Date().getTime();
let seed = timestamp%1000
let eq = new RandomEquation(seed); 
let cnt = 1;
let total = 10;
let point = 0;
console.log('Quiz Begin!');
var recursiveAsyncReadLine = function () {
  rl.question(eq.question, function (answer) {
    let input = Number(answer);
    let isAnswerRight:boolean = false
    if(!isNaN(input)){
      if(eq.isRight(input)){
        isAnswerRight = true;
      }
    }
    if(isAnswerRight){
      point++;
      console.log('Right! now Point:' + point);
    }
    else{
      console.log('Wrong! now Point:' + point);
    }
    if(cnt >= total){
      console.log("quiz ends! your point is:" + point + '/' + total);
      return rl.close(); //closing RL and returning from function.
    }
    cnt = cnt + 1;
    eq.refresh();
    recursiveAsyncReadLine(); //Calling this function again to ask new question
  });
};

recursiveAsyncReadLine(); //we have to actually start our recursion somehow
