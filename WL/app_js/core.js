 /*------------------------------------------------------
 
            Vytvoril: Ferdinand Križan
 
 ------------------------------------------------------*/

function parse(class_name, id_name) {
    result = "";
    //console.log(class_name);
    var call = [];

    if (id_name == '#create-proc') {

        var proc_name = $(id_name).parent().parent().find('.proc-name').first().text();

        result += "definuj ";
        result += proc_name + "(";
        var remove = false;
        $(id_name).find('.parameter-variables').first().find('.parameter').each(function(index, obj) {
            result += $(obj).find('.com_variable').text() + ",";
            remove = true;
        });
        if (remove) {
            result = result.substring(0, result.length - 1);
        }
        result += ") ["

    }

    var exist_proc = false;
    $(class_name, id_name).each(function(index, obj) {
        //console.log(obj);
        if ($(obj).hasClass('proc')) {
            var proc_name = $(obj).find('.proc-name').first().text();

            result += " " + proc_name + "(";
            var remove = false;
            $(obj).find('.parameter').each(function(index, obj) {
                result += $(obj).find('.com_value').text() + ",";
                remove = true;
            });
            if (remove) {
                result = result.substring(0, result.length - 1);
            }
            result += ") ";


        } else if ($(obj).hasClass('loop')) {
            result += " opakuj " + $(obj).find('.com_value').first().text() + " [";
        } else if ($(obj).hasClass('fd')) {
            result += " dopredu " + $(obj).find('.com_value').first().text();
        } else if ($(obj).hasClass('rt')) {
            result += " vpravo " + $(obj).find('.com_value').first().text();
        } else if ($(obj).hasClass('lt')) {
            result += " vlavo " + $(obj).find('.com_value').first().text();
        } else if ($(obj).hasClass('pw')) {
            result += " hrubka " + $(obj).find('.com_value').first().text();
        } else if ($(obj).hasClass('pc')) {
            result += " farba '" + $(obj).find('.comm_value').first().text() + "'";
        } else if ($(obj).hasClass('word_text')) {
            var v_text = $(obj).find('.comm_value').first().val();
            if (v_text.length > 0) {
                result += " vypis '" + v_text + "'";
            }
        } else if ($(obj).hasClass('point')) {
            result += " bodka " + $(obj).find('.com_value').first().text();
        } else if ($(obj).hasClass('set_pen_up')) {
            result += " pero " + get_command(INSTRUCTION_UP, command_lang);
        } else if ($(obj).hasClass('set_pen_down')) {
            result += " pero " + get_command(INSTRUCTION_DOWN, command_lang);
        } else if ($(obj).hasClass('com-end')) {
            result += "] ";
        } else if ($(obj).hasClass('com-end-proc')) {
            if (call.length != 0) {
                result += "] " + call.pop();
            } else {
                result += "] ";
            }
        }


    });

    //console.log(call);
    return result;
}

var strom = new Interpreter();
var root = strom.parse(); // Inicializacia, aby nepadalo na tom, ze neexistuje premenna

// API pre interpretaciu prikazov
function execute_tree() {
    root.Execute();
}

function delete_tree() {
    root = "";
}

function generate(id_name) {
    if (execute_commands) {
        prepare_parameters();
        if (typeof(id_name) === 'undefined') id_name = '#commands-panel';
        result = "";

        draw_init();
        result = parse('.command', id_name);
        //console.log(result)
        try {
            strom.evaluate(result);
            root = strom.parse();
            root.Execute();
        } catch (err) {
            $('#show-error-log').html(err);
            $('#show-error').modal('show');
        }
        draw_turtle();
        draw_end();
    } else {
        prepare_parameters('#create-proc');
    }
}

function load_commands(data) {
    strom.evaluate(data);

    root = strom.parse();

    $('.command-list ul').html(strom.generate_frontend(data));
    generate();
}

function draw_command_line(data) {
    draw_init();

    strom.evaluate(data);

    root = strom.parse();

    root.Execute();

    draw_turtle();
    draw_end();
}

function Get_code() {

    var program = "";

    for (var _i = 0, _a = Array.from(SUBROUTINES.keys()); _i < _a.length; _i++) {
        var key = _a[_i];
        program += SUBROUTINES.get(key).Get() + "  \r\n ";
    }
    program += root.Get();

    return program;
}

function Prepare_FE_prameters(name) {

    var parameters = [];
    for (var _i = 0, _a = Array.from(SUBROUTINES.keys()); _i < _a.length; _i++) {
        var key = _a[_i];
        if (key == name) {
            return SUBROUTINES.get(key).Variables;
        }
    }

    return new Map();
}

function get_prameters(name) {

    var parameters = [];
    for (var _i = 0, _a = Array.from(SUBROUTINES.keys()); _i < _a.length; _i++) {
        var key = _a[_i];
        if (key == name) {
            return SUBROUTINES.get(key).Parameters;
        }
    }

    return new Map();
}

function Prepare_FE_commands(name) {

    var commands = ""
    for (var _i = 0, _a = Array.from(SUBROUTINES.keys()); _i < _a.length; _i++) {
        var key = _a[_i];
        if (key == name) {
            commands = SUBROUTINES.get(key).Body.Get();
            break;
        }
    }
    commands = strom.generate_frontend(commands);

    return commands;
}

function Exist_proc(name) {

    for (var _i = 0, _a = Array.from(SUBROUTINES.keys()); _i < _a.length; _i++) {
        var key = _a[_i];
        if (key == name) {
            return true;
        }
    }

    return false;
}

function remove_procedure(name) {
    for (var _i = 0, _a = Array.from(SUBROUTINES.keys()); _i < _a.length; _i++) {
        var key = _a[_i];
        if (key == name) {
            SUBROUTINES.delete(key);
        }
    }
}