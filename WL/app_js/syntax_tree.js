 /*------------------------------------------------------
 
            Vytvoril: Ferdinand Križan
 
 ------------------------------------------------------*/

var __extends = (this && this.__extends) || (function() {
    var extendStatics = Object.setPrototypeOf ||
        ({
                __proto__: []
            }
            instanceof Array && function(d, b) {
                d.__proto__ = b;
            }) ||
        function(d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p)) d[p] = b[p];
        };
    return function(d, b) {
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var VARIABLES = new Map();
var SUBROUTINES = new Map();
var tmp_VARIABLES = new Map();
var tmp_SUBROUTINES = new Map();
var LOCALL = null;
var format_space = '';

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isWord(n) {
    return n.match("^[a-zA-Z]+$");
}

function isWordOrNumeric(n) {
    return n.match("^[a-zA-Z0-9]+$");
}

function in_sub(name) {
    for (var _i = 0, _a = Array.from(SUBROUTINES.keys()); _i < _a.length; _i++) {
        var key = _a[_i];
        if (key == name) {
            return true;
        }
    }
    return false;
}

function get_all_parameters() {
    var param = new Map();
    for (var _i = 0, _a = Array.from(SUBROUTINES.keys()); _i < _a.length; _i++) {
        var key = _a[_i];
        for (var _ii = 0, _aa = Array.from(SUBROUTINES.get(key).Variables.keys()); _ii < _aa.length; _ii++) {
            var v_key = _aa[_ii];
            param.set(v_key, SUBROUTINES.get(key).Variables.get(v_key));
        }
    }
    for (var _i = 0, _a = Array.from(VARIABLES.keys()); _i < _a.length; _i++) {
        var v_key = _a[_i];
        param.set(v_key, VARIABLES.get(v_key));
    }
    return param;
}

// Syntax tree
var Expression = /** @class */ (function() {
    function Expression() {}
    Expression.prototype.Evaluate = function() {
        return 0;
    };
    Expression.prototype.Get = function() {
        return "";
    };
    return Expression;
}());
var Const = /** @class */ (function(_super) {
    __extends(Const, _super);

    function Const(nValue, nName) {
        var _this = _super.call(this) //?
            || this;
        _this.Value = nValue;
        _this.Name = nName;
        return _this;
    }
    Const.prototype.Evaluate = function() {
        if (isNumeric(String(this.Value))) {
            return this.Value;
        }
        if (this.Name != "") {
            // prejdeme parametre
            if (SUBROUTINES.get(this.Name).Variables.has(this.Value)) {
                var param = SUBROUTINES.get(this.Name).Variables.get(this.Value);

                // Zlyhava mapovanie :( , pozriem vsetko
                var all_params = get_all_parameters();
                while (all_params.has(param)) {
                    param = all_params.get(param);
                }
                return param;
            }
        } else {
            for (var key in SUBROUTINES.keys()) {
                if (SUBROUTINES.get(key).Variables.has(this.Value)) {
                    return SUBROUTINES.get(key).Variables.get(this.Value);
                }
            }
        }
        // nie je cislo, treba este pozriet, ci nieje index
        var all_params = get_all_parameters();
        var param = this.Value;

        while (all_params.has(param)) {
            param = all_params.get(param);
        }
        return param;
        //return this.Value;
    };
    Const.prototype.Get = function() {
        if (isNumeric(this.Value)) {
            return String(this.Value);
        }
        if (this.Name != "") {
            if (SUBROUTINES.get(this.Name).Variables.has(this.Value)) {
                return this.Value;
            }
        }
        return this.Value;
    };
    return Const;
}(Expression));
var BinaryOperation = /** @class */ (function(_super) {
    __extends(BinaryOperation, _super);

    function BinaryOperation(nL, nR) {
        var _this = _super.call(this) || this;
        _this.L = nL;
        _this.R = nR;
        return _this;
    }
    return BinaryOperation;
}(Expression));
var Add = /** @class */ (function(_super) {
    __extends(Add, _super);

    function Add() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Add.prototype.Evaluate = function() {
        return this.L.Evaluate() + this.R.Evaluate();
    };
    return Add;
}(BinaryOperation));
var Sub = /** @class */ (function(_super) {
    __extends(Sub, _super);

    function Sub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sub.prototype.Evaluate = function() {
        return this.L.Evaluate() - this.R.Evaluate();
    };
    return Sub;
}(BinaryOperation));
var Mul = /** @class */ (function(_super) {
    __extends(Mul, _super);

    function Mul() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mul.prototype.Evaluate = function() {
        return this.L.Evaluate() * this.R.Evaluate();
    };
    return Mul;
}(BinaryOperation));
var Div = /** @class */ (function(_super) {
    __extends(Div, _super);

    function Div() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Div.prototype.Evaluate = function() {
        return this.L.Evaluate() / this.R.Evaluate();
    };
    return Div;
}(BinaryOperation));

var Command = /** @class */ (function() {
    function Command() {}
    Command.prototype.Execute = function() {};
    Command.prototype.Get = function() {};
    return Command;
}());
var TurtleCommand = /** @class */ (function(_super) {
    __extends(TurtleCommand, _super);

    function TurtleCommand(nparam) {
        var _this = _super.call(this) || this;
        _this.Param = nparam;
        return _this;
    }
    return TurtleCommand;
}(Command));
var FD = /** @class */ (function(_super) {
    __extends(FD, _super);

    function FD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FD.prototype.Execute = function() {
        var n_value = this.Param.Evaluate();
        if (!isNumeric(n_value)) {
            throw window["WORDS_" + LANG]['unknown-value'] + ": <b>" + n_value + "</b> " + window["WORDS_" + LANG]['for-command'] + " dopredu. " + window["WORDS_" + LANG]['value-must-be-number'];
        }
        execute_forward(n_value);
    };
    FD.prototype.Get = function() {
        return format_space + get_command(INSTRUCTION_FD, command_lang) + " " + String(this.Param.Get()) + " \r\n";
    };
    return FD;
}(TurtleCommand));
var LT = /** @class */ (function(_super) {
    __extends(LT, _super);

    function LT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LT.prototype.Execute = function() {
        var n_value = this.Param.Evaluate();
        if (!isNumeric(n_value)) {
            throw window["WORDS_" + LANG]['unknown-value'] + ": <b>" + n_value + "</b> " + window["WORDS_" + LANG]['for-command'] + " vlavo. " + window["WORDS_" + LANG]['value-must-be-number'];
        }
        execute_left(n_value);
    };
    LT.prototype.Get = function() {
        return format_space + get_command(INSTRUCTION_LT, command_lang) + " " + String(this.Param.Get()) + " \r\n";
    };
    return LT;
}(TurtleCommand));
var RT = /** @class */ (function(_super) {
    __extends(RT, _super);

    function RT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RT.prototype.Execute = function() {
        var n_value = this.Param.Evaluate();
        if (!isNumeric(n_value)) {
            throw window["WORDS_" + LANG]['unknown-value'] + ": <b>" + n_value + "</b> " + window["WORDS_" + LANG]['for-command'] + " vpravo. " + window["WORDS_" + LANG]['value-must-be-number'];
        }
        execute_right(n_value);
    };
    RT.prototype.Get = function() {
        return format_space + get_command(INSTRUCTION_RT, command_lang) + " " + String(this.Param.Get()) + " \r\n";
    };
    return RT;
}(TurtleCommand));
var PC = /** @class */ (function(_super) {
    __extends(PC, _super);

    function PC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PC.prototype.Execute = function() {
        var n_value = this.Param.Evaluate();
        /*
		if (!isNumeric(n_value)){
			throw "Nepoznám hodnotu: <b>"+n_value+"</b> pre príkaz farba. Hodnota musí byť číslo!";
		}			*/
        execute_pc(n_value);
    };
    PC.prototype.Get = function() {
        return format_space + get_command(INSTRUCTION_PC, command_lang) + " '" + String(this.Param.Get()) + "' \r\n";
    };
    return PC;
}(TurtleCommand));
var PW = /** @class */ (function(_super) {
    __extends(PW, _super);

    function PW() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PW.prototype.Execute = function() {
        var n_value = this.Param.Evaluate();
        if (!isNumeric(n_value)) {
            throw window["WORDS_" + LANG]['unknown-value'] + ": <b>" + n_value + "</b> " + window["WORDS_" + LANG]['for-command'] + " hrubka. " + window["WORDS_" + LANG]['value-must-be-number'];
        }
        execute_pw(n_value);
    };
    PW.prototype.Get = function() {
        return format_space + get_command(INSTRUCTION_PW, command_lang) + " " + String(this.Param.Get()) + " \r\n";
    };
    return PW;
}(TurtleCommand));
var PT = /** @class */ (function(_super) {
    __extends(PT, _super);

    function PT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PT.prototype.Execute = function() {
        var n_value = this.Param.Evaluate();
        if (!isNumeric(n_value)) {
            throw window["WORDS_" + LANG]['unknown-value'] + ": <b>" + n_value + "</b> " + window["WORDS_" + LANG]['for-command'] + " bodka. " + window["WORDS_" + LANG]['value-must-be-number'];
        }
        execute_pt(n_value);
    };
    PT.prototype.Get = function() {
        return format_space + get_command(INSTRUCTION_PT, command_lang) + " " + String(this.Param.Get()) + " \r\n";
    };
    return PT;
}(TurtleCommand));
var SP = /** @class */ (function(_super) {
    __extends(SP, _super);

    function SP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SP.prototype.Execute = function() {
        execute_sp(this.Param.Evaluate());
    };
    SP.prototype.Get = function() {
        return format_space + get_command(INSTRUCTION_PEN, command_lang) + " " + String(this.Param.Get()) + " \r\n";
    };
    return SP;
}(TurtleCommand));
var Print = /** @class */ (function(_super) {
    __extends(Print, _super);

    function Print(nValue) {
        var _this = _super.call(this) || this;
        _this.Value = nValue;
        return _this;
    }
    Print.prototype.Execute = function() {
        execute_write_text(this.Value.Evaluate());
        //console.log("Vypis: " + this.Value.Evaluate());
    };
    Print.prototype.Get = function() {
        return format_space + get_command(INSTRUCTION_TEXT, command_lang) + " '" + String(this.Value.Get()) + "' \r\n";
    };
    return Print;
}(Command));
var Commands = /** @class */ (function(_super) {
    __extends(Commands, _super);

    function Commands() {
        var nitems = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nitems[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.Items = [];
        for (var _a = 0, nitems_1 = nitems; _a < nitems_1.length; _a++) {
            var i = nitems_1[_a];
            _this.Items.push(i);
        }
        return _this;
    }
    Commands.prototype.Add = function(item) {
        this.Items.push(item);
    };
    Commands.prototype.Execute = function() {
        for (var _i = 0, _a = this.Items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.Execute();
        }
    };
    Commands.prototype.Get = function() {
        var result = "";
        for (var _i = 0, _a = this.Items; _i < _a.length; _i++) {
            var item = _a[_i];
            var pom = item.Get();
            if (pom != null) {
                result += pom;
            }
        }
        return result;
    };
    return Commands;
}(Command));
var Repeat = /** @class */ (function(_super) {
    __extends(Repeat, _super);

    function Repeat(nCount, nBody) {
        var _this = _super.call(this) || this;
        _this.Count = nCount;
        _this.Body = nBody;
        return _this;
    }
    Repeat.prototype.Execute = function() {
        var n = this.Count.Evaluate();
        while (n > 0) {
            this.Body.Execute();
            n = n - 1;
            if (VARIABLES.has("index")) {
                VARIABLES.set("index", String(Number(VARIABLES.get("index")) + 1));
            }
        }
        VARIABLES.set("index", "1");
    };
    Repeat.prototype.Get = function() {
        var result = format_space + get_command(INSTRUCTION_LOOP, command_lang) + " " + String(this.Count.Evaluate()) + " [  \r\n";
        format_space += '    ';
        result += this.Body.Get();
        format_space = format_space.slice(0, -4);
        result += format_space + "]  \r\n";
        return result;
    };
    return Repeat;
}(Command));
/*
class While extends Command{
    Test: Expression;
    Body: Command;
    constructor(nTest, nBody) {
        super();
        this.Test = nTest;
        this.Body = nBody;
    }
    Execute() {
        while (this.Test.Evaluate() != 0) {
            this.Body.Execute();
        }
    }
}

class If extends Command{
    Test: Expression;
    BodyTrue: Command;
    BodyFalse: any;
    constructor(nTest, nBodyTrue, nBodyFalse) {
        super();
        this.Test = nTest;
        this.BodyFalse = nBodyFalse;
        this.BodyTrue = nBodyTrue;
    }
    Execute() {
        if (this.Test.Evaluate() != 0) {
            this.BodyTrue.Execute();
        }
        else if (this.BodyFalse != "") {
            this.BodyFalse.Execute();
        }
    }
}
*/
var Var = /** @class */ (function(_super) {
    __extends(Var, _super);

    function Var(nName) {
        var _this = _super.call(this) || this;
        _this.Name = nName;
        return _this;
    }
    Var.prototype.Evaluate = function() {
        return Number(VARIABLES.get(this.Name));
    };
    Var.prototype.Get = function() {
        return String(this.Name);
    };
    return Var;
}(Expression));
var GlobalVar = /** @class */ (function(_super) {
    __extends(GlobalVar, _super);

    function GlobalVar(nName) {
        return _super.call(this, nName) || this;
    }
    return GlobalVar;
}(Var));
var LocalVar = /** @class */ (function(_super) {
    __extends(LocalVar, _super);

    function LocalVar(nName, nLocal) {
        var _this = _super.call(this, nName) || this;
        _this.Local = nLocal;
        return _this;
    }
    return LocalVar;
}(Var));
var Assign = /** @class */ (function(_super) {
    __extends(Assign, _super);

    function Assign(nVariable, nValue) {
        var _this = _super.call(this) || this;
        _this.Variable = nVariable;
        _this.Value = nValue;
        return _this;
    }
    Assign.prototype.Execute = function() {
        VARIABLES.set(this.Variable.Name, String(this.Value.Evaluate()));
    };
    return Assign;
}(Command));
var Subroutine = /** @class */ (function(_super) {
    __extends(Subroutine, _super);

    function Subroutine(nName) {
        var _this = _super.call(this) || this;
        _this.Variables = new Map();
        _this.Name = nName;
        _this.Parameters = [];
        return _this;
    };
    Subroutine.prototype.PrepareParameters = function() {
        var delta = -1 - (this.Parameters.length);
        for (var param in this.Parameters) {
            this.Variables.set(this.Parameters[param], String(delta));
            delta++;
        }
    };
    Subroutine.prototype.EExecute = function() {
        // kvoli indexu v cykle, aby sa neprepisoval s povodnym
        var global_index = VARIABLES.get('index');
        this.Body.Execute();
        if (VARIABLES.has('index')) {
            VARIABLES.set('index', global_index);
        }
    };
    Subroutine.prototype.Set_arguments = function(args) {
        var index = 0;
        //console.log(args);
        //console.log(this.Name);
        //console.log(this.Parameters);
        //console.log(this.Variables);
        //console.log(args);
        for (var i in this.Parameters) {
            if (args.length >= SUBROUTINES.get(this.Name).Variables.size && index >= args.lengt) {
                if (SUBROUTINES.get(this.Name).Variables.has(this.Parameters[i])) {
                    if (args[index] instanceof GlobalVar) {
                        SUBROUTINES.get(this.Name).Variables.set(this.Parameters[i], VARIABLES.get(args[index].Name));
                    } else {
                        SUBROUTINES.get(this.Name).Variables.set(this.Parameters[i], args[index].Value);
                    }
                } else {
                    SUBROUTINES.get(this.Name).Variables.set(this.Parameters[i], String(0));
                }
            } else {
                if (index < args.length) {
                    if (SUBROUTINES.get(this.Name).Variables.has(this.Parameters[i])) {
                        if (args[index] instanceof GlobalVar) {
                            SUBROUTINES.get(this.Name).Variables.set(this.Parameters[i], VARIABLES.get(args[index].Name));
                        } else {
                            SUBROUTINES.get(this.Name).Variables.set(this.Parameters[i], args[index].Value);
                        }
                    } else {
                        SUBROUTINES.get(this.Name).Variables.set(this.Parameters[i], String(0));
                    }
                } else {
                    SUBROUTINES.get(this.Name).Variables.set(this.Parameters[i], String(0));
                }
            }
            index++;
        }
    };
    Subroutine.prototype.Get_call = function() {
        var result = format_space + String(this.Name) + " (";
        var params = false;
        for (var _i = 0, _a = Array.from(this.Variables.keys()); _i < _a.length; _i++) {
            var key = _a[_i];
            result += String(this.Variables.get(key)) + ", ";
            params = true;
        }
        if (params) {
            result = result.slice(0, -2);
        }
        result += ")  \r\n";
        return result;
    };
    Subroutine.prototype.Get = function() {
        var result = format_space + get_command(INSTRUCTION_PROC, command_lang) + " " + String(this.Name) + " (";
        var params = false;
        for (var i in this.Parameters) {
            result += String(this.Parameters[i]) + ", ";
            params = true;
        }
        if (params) {
            result = result.slice(0, -2);
        }
        result += ") [  \r\n";
        format_space += '    ';
        result += this.Body.Get();
        format_space = format_space.slice(0, -4);
        result += format_space + "] \r\n";
        return result;
    };
    return Subroutine;
}(Command));
var Call = /** @class */ (function(_super) {
    __extends(Call, _super);

    function Call(nName, nArguments) {
        var _this = _super.call(this) || this;
        _this.Name = nName;
        _this.Arguments = nArguments;
        return _this;
    }
    return Call;
}(Expression));
var Perform = /** @class */ (function(_super) {
    __extends(Perform, _super);

    function Perform(nName, nArguments) {
        var _this = _super.call(this) || this;
        _this.Arguments = [];
        _this.Name = nName;
        _this.Arguments = nArguments;
        return _this;
    }
    Perform.prototype.Execute = function() {
        //console.log("-----" + this.Name + "-----");
        SUBROUTINES.get(this.Name).Set_arguments(this.Arguments);
        //console.log(SUBROUTINES.get(this.Name).Variables);
        SUBROUTINES.get(this.Name).EExecute();
    };
    Perform.prototype.Get = function() {
        SUBROUTINES.get(this.Name).Set_arguments(this.Arguments);
        return SUBROUTINES.get(this.Name).Get_call();
    };
    return Perform;
}(Expression));
var Interpreter = /** @class */ (function() {
    function Interpreter() {
        this.input = "";
        this.look = '';
        this.index = 0;
        this.token = "";
        this.procedure_name = "";
    }
    Interpreter.prototype.next = function() {
        if (this.index >= this.input.length) {
            this.look = String.fromCharCode(0);
        } else {
            this.look = this.input[this.index];
            this.index++;
        }
    };
    Interpreter.prototype.scan = function() {
        while ((this.look == ' ') || (this.look == '\n') || (this.look == '\r')) {
            this.next();

        }
        this.token = "";


        if (this.look == "#") {
            this.token += this.look;
            this.next();
            while (isNumeric(this.look) || isWord(this.look) || this.look == '_') {
                this.token += this.look;
                this.next();
            }
        } else if (this.look == "'") {
            this.next();
            while (this.look != "'" && this.index < this.input.length) {
                this.token += this.look;
                this.next();
            }
            this.next();
        } else if (isWord(this.look)) {
            while (isWord(this.look) || isNumeric(this.look)) {
                this.token += this.look;
                this.next();
            }
        } else if (isNumeric(this.look)) {
            while (isNumeric(this.look)) {
                this.token += this.look;
                this.next();
            }
            if (this.look == '.') {
                while (isNumeric(this.look)) {
                    this.token += this.look;
                    this.next();
                }
            }
            if (this.look == 'e') {
                this.next();
                this.token += this.look;
                while (isNumeric(this.look)) {
                    this.token += this.look;
                    this.next();
                }
            }
        } else if (this.look.charCodeAt() == 0) {
            this.token = this.look;
            this.next();
        } else if (this.look == '<' || this.look == '>') {
            this.token = this.look;
            this.next();
            if (this.look == '=') {
                this.token += this.look;
                this.next();
            }
        } else if (this.look.charCodeAt() != 0) {
            this.token = this.look;
            this.next();
        }
    };
    Interpreter.prototype.number = function() {
        var result = new Expression();
        if (isNumeric(this.token)) {
            result = new Const(parseInt(this.token), this.procedure_name);
            this.scan();
        } else if ((LOCALL != null) && (LOCALL.Variables.has(String(this.token)))) {
            result = new Const(this.token, this.procedure_name); //ZMENA CONST
            this.scan();
        } else if (VARIABLES.has(this.token)) {
            result = new GlobalVar(this.token);
            this.scan();
        } else if (SUBROUTINES.has(this.token)) {
            var name = this.token;
            this.scan();
            result = new Call(name, this.args());
        } else if (this.token != "") {
            result = new Const(this.token, this.procedure_name);
            this.scan();
        }
        /*
              else {
                  for (var _i = 0, _a = Array.from(SUBROUTINES.keys()); _i < _a.length; _i++) {
                      var key = _a[_i];
                      if (SUBROUTINES.get(key).Variables.has(String(this.token))) {
                          return new Const(this.token, this.procedure_name);
                      }
                  }
              }*/

        return result;
    };
    Interpreter.prototype.sum = function() {
        var result = this.number();
        while (true) {
            if (this.token == "+") {
                this.scan();
                result = result + this.number();
            } else if (this.token == "-") {
                this.scan();
                result = result - this.number();
            } else {
                return result;
            }
        }
        return result;
    };
    Interpreter.prototype.evaluate = function(text) {
        this.input = text;
        this.index = 0;
        this.next();
        this.scan();
    };
    Interpreter.prototype.muldiv = function() {
        var result = this.minus();
        while (true) {
            if (this.token == "*") {
                this.scan();
                result = new Mul(result, this.number());
            } else if (this.token == "/") {
                this.scan();
                result = new Div(result, this.number());
            } else {
                return result;
            }
        }
        return result;
    };
    Interpreter.prototype.addsub = function() {
        var result = this.muldiv();
        while (true) {
            if (this.token == "+") {
                this.scan();
                result = new Add(result, this.muldiv());
            } else if (this.token == "-") {
                this.scan();
                result = new Sub(result, this.muldiv());
            } else {
                return result;
            }
        }
        return result;
    };
    Interpreter.prototype.braces = function() {
        if (this.token != "(") {
            return this.number();
        }
        this.scan();
        var result = this.addsub();
        if (this.token == ")") {
            this.scan();
        }
        return result;
    };
    Interpreter.prototype.minus = function() {
        if (this.token != "-") {
            return this.braces();
        }
        this.scan();
        return (-this.braces());
    };
    Interpreter.prototype.args = function() {
        var result = [];
        if (this.token == "(") {
            this.scan();
            while ((this.token != "") && (this.token != ")")) {
                result.push(this.addsub());
                if (this.token == ",") {
                    this.scan();
                }
            }
            if (this.token == ")") {
                this.scan();
            }
        }
        return result;
    };
    Interpreter.prototype.parse = function() {
        var result = new Commands();
        while (true) {
            if (get_instruction(this.token) == INSTRUCTION_FD) {
                this.scan();
                result.Add(new FD(this.addsub()));
            } else if (get_instruction(this.token) == INSTRUCTION_LT) {
                this.scan();
                result.Add(new LT(this.addsub()));
            } else if (get_instruction(this.token) == INSTRUCTION_RT) {
                this.scan();
                result.Add(new RT(this.addsub()));
            } else if (get_instruction(this.token) == INSTRUCTION_PW) {
                this.scan();
                result.Add(new PW(this.addsub()));
            } else if (get_instruction(this.token) == INSTRUCTION_PC) {
                this.scan();
                result.Add(new PC(this.addsub()));
            } else if (get_instruction(this.token) == INSTRUCTION_PT) {
                this.scan();
                result.Add(new PT(this.addsub()));
            } else if (get_instruction(this.token) == INSTRUCTION_PEN) {
                this.scan();
                result.Add(new SP(this.addsub()));
            } else if (get_instruction(this.token) == INSTRUCTION_TEXT) {
                this.scan();
                result.Add(new Print(this.addsub()));
            } else if (get_instruction(this.token) == INSTRUCTION_LOOP) {
                VARIABLES.set("index", "1"); //  Vytvorime si premennu v cykle
                this.scan();
                var count = this.addsub();
                if (this.token == "[") {
                    this.scan();
                    var body = this.parse();
                }
                if (this.token == "]") {
                    this.scan();
                    result.Add(new Repeat(count, body));
                }
            } else if (get_instruction(this.token) == INSTRUCTION_PROC) {
                if (LOCALL != null) {
                    alert("Chyba, nespravne miesto");
                    break;
                }
                this.scan();
                LOCALL = new Subroutine(this.token);
                SUBROUTINES.set(this.token, LOCALL);
                this.procedure_name = this.token;
                this.scan();
                if (this.token == "(") {
                    this.scan();
                    while (isWord(this.token)) {
                        LOCALL.Parameters.push(this.token);
                        this.scan();
                        if (this.token == ",") {
                            this.scan();
                        }
                    }
                    if (this.token == ")") {
                        this.scan();
                    }
                    LOCALL.PrepareParameters();
                }
                if (this.token == "[") {
                    this.scan();
                    LOCALL.Body = this.parse();
                    if (this.token == "]") {
                        this.scan();
                    }
                }
                result.Add(LOCALL);
                LOCALL = null;
            } else if (isWordOrNumeric(this.token)) {
                var name = this.token;
                this.scan();
                if (this.token == "=") {
                    this.scan();
                    var expr = this.addsub();
                    if (LOCALL != null) {
                        if (LOCALL.Variables.has(name)) {
                            result.Add(new Assign(new LocalVar(name, LOCALL), expr));
                        } else {
                            var delta = LOCALL.Variable.size - LOCALL.Parameters.length + 1;
                            result.Add(new Assign(new LocalVar(name, LOCALL), expr));
                        }
                    } else {
                        if (VARIABLES.has(name)) {
                            result.Add(new Assign(new GlobalVar(name), expr));
                        } else {
                            VARIABLES.set(name, String(VARIABLES.size));
                            result.Add(new Assign(new GlobalVar(name), expr));
                        }
                    }
                } else if (SUBROUTINES.has(name)) {
                    result.Add(new Perform(name, this.args())); // stvorec 100
                }
                /*
                            else {
                                var chyba = true; // # Nemusi znamenat chybu, moze tam byt parameter vo funkcii
                                for (var key in SUBROUTINES.keys()) {
                                    if (SUBROUTINES.get(key).Variables.has(name)) {
                                        chyba = false;
                                        break;
                                    }
                                }
                                if (chyba) {
                                    alert("Chyba, nepoznam " + name + " " + this.token);
                                }
                            }*/
            } else {
                return result;
            }
        }
    };

    Interpreter.prototype.Get = function() {
        //console.log("GET");
        return "";
    };

    Interpreter.prototype.generate_frontend = function(text) {
        this.input = text;
        this.index = 0;
        this.next();
        this.scan();
        return this.generate_fe();
    };
    Interpreter.prototype.generate_args = function() {
        var result = "";
        if (this.token == "(") {
            result += "(";
            this.scan();
            while ((this.token != "") && (this.token != ")")) {
                result += this.token;
                this.scan();
                if (this.token == ",") {
                    result += ",";
                    this.scan();
                }
            }
            if (this.token == ")") {
                result += ")";
                this.scan();
            }
        }
        return result;
    };
    Interpreter.prototype.generate_fe = function() {
        var result = "";
        while (true) {
            if (get_instruction(this.token) == INSTRUCTION_FD) {
                this.scan();
                result += '<div class=" ui-draggable" style="display: block;">' + command_div_forward(window["WORDS_" + LANG]['forward'], this.token) + '</div>';
                this.scan();
            } else if (get_instruction(this.token) == INSTRUCTION_LT) {
                this.scan();
                result += '<div class=" ui-draggable" style="display: block;">' + command_div_left(window["WORDS_" + LANG]['left'], this.token) + '</div>';
                this.scan();
            } else if (get_instruction(this.token) == INSTRUCTION_RT) {
                this.scan();
                result += '<div class=" ui-draggable" style="display: block;">' + command_div_right(window["WORDS_" + LANG]['right'], this.token) + '</div>';
                this.scan();
            } else if (get_instruction(this.token) == INSTRUCTION_PW) {
                this.scan();
                result += '<div class=" ui-draggable" style="display: block;">' + command_div_pw('hrubka', this.token) + '</div>';
                this.scan();
            } else if (get_instruction(this.token) == INSTRUCTION_PC) {
                this.scan();
                result += '<div class=" ui-draggable" style="display: block;">' + command_div_pc('farba', this.token) + '</div>';
                this.scan();
            } else if (get_instruction(this.token) == INSTRUCTION_PT) {
                this.scan();
                result += '<div class=" ui-draggable" style="display: block;">' + command_div_point_old('bodka', this.token) + '</div>';
                this.scan();
            } else if (get_instruction(this.token) == INSTRUCTION_TEXT) {
                this.scan();
                result += '<div class=" ui-draggable" style="display: block;">' + command_div_text('vypis', this.token) + '</div>';
                this.scan();
            } else if (get_instruction(this.token) == INSTRUCTION_PEN) {
                this.scan();
                if (this.token == INSTRUCTION_UP) {
                    result += '<div class=" ui-draggable" style="display: block;">' + command_div_set_pen_up('pero', this.token) + '</div>';
                } else if (this.token == INSTRUCTION_DOWN) {
                    result += '<div class=" ui-draggable" style="display: block;">' + command_div_set_pen_down('pero', this.token) + '</div>';
                }
                this.scan();
            } else if (get_instruction(this.token) == INSTRUCTION_LOOP) {
                this.scan();
                //result += "opakuj " + this.token;
                var count = this.token;
                this.scan();
                if (this.token == "[") {
                    this.scan();
                    result += '<div class="ui-draggable" style="display: block;">' + command_div_loop_first_part(window["WORDS_" + LANG]['loop'], count) + this.generate_fe();
                }
                if (this.token == "]") {
                    this.scan();
                    result += command_div_loop_second_part('koniec') + this.generate_fe() + '</div>';
                }
            } else if (get_instruction(this.token) == INSTRUCTION_PROC) {
                if (LOCALL != null) {
                    alert("Chyba, nespravne miesto");
                    break;
                }
                this.scan();
                //LOCALL = new Subroutine(this.token);
                //SUBROUTINES.set(this.token, LOCALL);
                this.procedure_name = this.token;
                insert_proc_FE(this.procedure_name);
                this.scan();
                if (this.token == "(") {
                    this.scan();
                    while (isWord(this.token)) {
                        //LOCALL.Parameters.push(this.token);
                        this.scan();
                        if (this.token == ",") {
                            this.scan();
                        }
                    }
                    if (this.token == ")") {
                        this.scan();
                    }
                    //LOCALL.PrepareParameters();
                }
                if (this.token == "[") {
                    this.scan();
                    var pom = this.parse();
                    //console.log(pom);
                    if (this.token == "]") {
                        this.scan();
                    }
                }
                //this.scan();
                console.log(this.token);
                //result.Add(LOCALL);
                //LOCALL = null;
            } else if (isWordOrNumeric(this.token)) {
                var name = this.token;
                this.scan();
                if (SUBROUTINES.has(name)) {

                    var params = [];
                    var variables = SUBROUTINES.get(name).Parameters;
                    if (this.token == "(") {
                        this.scan();
                        while ((this.token != "") && (this.token != ")")) {

                            if (this.token != ",") {
                                params.push(this.token);
                            }
                            this.scan();

                        }
                        if (this.token == ")") {
                            this.scan();
                        }
                    }

                    //console.log(params);

                    var n_result = new Map();
                    variables.forEach(function(key, i) {
                        n_result.set(key, params[i])
                    });
                    //console.log(result);					

                    result += '<div class="ui-draggable" style="display: block;">' + command_proc_call_load(name, n_result) + '</div>';
                } else {
                    var chyba = true; // # Nemusi znamenat chybu, moze tam byt parameter vo funkcii
                    for (var key in SUBROUTINES.keys()) {
                        if (SUBROUTINES.get(key).Variables.has(name)) {
                            chyba = false;
                            break;
                        }
                    }
                    if (chyba) {
                        alert("Chyba, nepoznam " + name + " " + this.token);
                    }
                }
            } else {
                return result;
            }
        }
    };

    Interpreter.prototype.test_strom = function() {

        this.input = "definuj stvorec(d, c,e) [opakuj 4[dopredu index vpravo c bodka e hrubka 8]]";
        this.index = 0;
        this.next();
        this.scan();
        var root = this.parse();
        root.Execute();
        this.input = "definuj obdlznik(d, c) [hrubka 8 farba 3 opakuj 2[dopredu d vlavo 77]]";
        this.index = 0;
        this.next();
        this.scan();
        root = this.parse();
        root.Execute();
        this.input = "stvorec(20,90,45) stvorec(20,20) stvorec() stvorec(10,10,10,10,10) obdlznik(50,50)";
        this.index = 0;
        this.next();
        this.scan();
        root = this.parse();
        root.Execute();
        //console.log(root.Get());
    };
    return Interpreter;
}());