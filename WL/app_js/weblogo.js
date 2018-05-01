 /*------------------------------------------------------
 
            Vytvoril: Ferdinand Križan
 
 ------------------------------------------------------*/
 
var key = 1;

var proc_count = 0;

var act_name_variable = "";
var execute_commands = true;
var prev_value = 1;
var count_proc = 0;
var b_draw_turtle = true;

function find_thumbnail_div(div, value) {
    if ($(div).hasClass('forward')) {
        if (value == -1) {
            value = 1;
        }
        return command_div_forward(window["WORDS_" + LANG]['forward'], value);
    }

    if ($(div).hasClass('left')) {
        if (value == -1) {
            value = 90;
        }
        return command_div_left(window["WORDS_" + LANG]['left'], value);
    }

    if ($(div).hasClass('right')) {
        if (value == -1) {
            value = 90;
        }
        return command_div_left(window["WORDS_" + LANG]['right'], value);
    }

    if ($(div).hasClass('loop')) {
        if (value == -1) {
            value = 1;
        }
        return command_div_loop(window["WORDS_" + LANG]['loop'], window["WORDS_" + LANG]['end-loop'], value);
    }

    if ($(div).hasClass('pw')) {
        if (value == -1) {
            value = 1;
        }
        return command_div_pw(window["WORDS_" + LANG]['pen-weight'], value);
    }

    if ($(div).hasClass('pc')) {
        if (value == -1) {
            value = 000;
        }
        return command_div_pc(window["WORDS_" + LANG]['pen_color'], '#000000');
    }
    if ($(div).hasClass('point')) {
        if (value == -1) {
            value = 1;
        }
        return command_div_point_old(window["WORDS_" + LANG]['point'], value);
    }
    if ($(div).hasClass('set_pen_up')) {
        return command_div_set_pen_up(window["WORDS_" + LANG]['set_pen'], window["WORDS_" + LANG]['pen_up']);
    }
    if ($(div).hasClass('set_pen_down')) {
        return command_div_set_pen_down(window["WORDS_" + LANG]['set_pen'], window["WORDS_" + LANG]['pen_down']);
    }
    if ($(div).hasClass('proc')) {
        if (value == -1) {
            value = 1;
        }
        return command_div_proc(window["WORDS_" + LANG]['procedure'], window["WORDS_" + LANG]['proc-save'], window["WORDS_" + LANG]['end-procedure'], value);
    }
    if ($(div).hasClass('time')) {
        if (value == -1) {
            value = 1;
        }
        return command_div_time(window["WORDS_" + LANG]['timer'], value);
    }
    if ($(div).hasClass('word_text')) {
        return command_div_text(window["WORDS_" + LANG]['text_word'], '');
    }
    if ($(div).hasClass('proc-call')) {
        var n_name = $(div).find('.text-center').first().text();
        return command_proc_call(n_name, value, Prepare_FE_prameters(n_name));
    }
    if (value == -1) {
        value = 90;
    }
    return command_div_right(window["WORDS_" + LANG]['right'], value);
}

function find_command_div(div, p_key, value) {
    key++;
    if ($(div).hasClass('forward')) {
        if (value == -1) {
            value = 1;
        }
        return command_div_forward(window["WORDS_" + LANG]['forward'], value);
    }

    if ($(div).hasClass('left')) {
        if (value == -1) {
            value = 90;
        }
        return command_div_left(window["WORDS_" + LANG]['left'], value);
    }

    if ($(div).hasClass('loop')) {
        if (value == -1) {
            value = 1;
        }
        return command_div_loop(window["WORDS_" + LANG]['loop'], window["WORDS_" + LANG]['end-loop'], value);
    }

    if ($(div).hasClass('pw')) {
        if (value == -1) {
            value = 1;
        }
        return command_div_pw(window["WORDS_" + LANG]['pen-weight'], value);
    }

    if ($(div).hasClass('pc')) {
        if (value == -1) {
            value = 000;
        }
        return command_div_pc(window["WORDS_" + LANG]['pen_color'], '#000000');
    }

    if ($(div).hasClass('point')) {
        if (value == -1) {
            value = 1;
        }
        return command_div_point_old(window["WORDS_" + LANG]['point'], value);
    }
    if ($(div).hasClass('set_pen_up')) {
        return command_div_set_pen_up(window["WORDS_" + LANG]['set_pen'], window["WORDS_" + LANG]['pen_up']);
    }
    if ($(div).hasClass('set_pen_down')) {
        return command_div_set_pen_down(window["WORDS_" + LANG]['set_pen'], window["WORDS_" + LANG]['pen_down']);
    }

    if ($(div).hasClass('proc')) {
        if (value == -1) {
            value = 1;
        }
        proc_count += 1;
        return command_div_proc(window["WORDS_" + LANG]['procedure'], window["WORDS_" + LANG]['proc-save'], window["WORDS_" + LANG]['end-procedure'], value);
    }

    if ($(div).hasClass('time')) {
        if (value == -1) {
            value = 1;
        }
        return command_div_time(window["WORDS_" + LANG]['timer'], value);
    }
    if ($(div).hasClass('word_text')) {
        return command_div_text(window["WORDS_" + LANG]['text_word'], '');
    }
    if ($(div).hasClass('proc-call')) {
        var n_name = $(div).find('.text-center').first().text();
        return command_proc_call(n_name, value, Prepare_FE_prameters(n_name));
    }

    if (value == -1) {
        value = 90;
    }
    return command_div_right(window["WORDS_" + LANG]['right'], value);
}

$("<style type='text/css'> .placeholder{ color:#f00; border: 0.1em dashed gray; height: 100px;} </style>").appendTo("head");
//$("<style type='text/css'> .pick-a-color-markup {margin:20px 0px;} .container {margin: 0px 5px; width: 50%;} </style>").appendTo("head");


$("#save").click(function(event) {
    var program = Get_code();
    //console.log(program);
    swal({
        title: "Ukladanie súboru",
        text: "Zadaj názov súboru:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "data"
    }, function(inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("Nie je zadaný názov súboru");
            return false;
        }
        download(inputValue + '.txt', program);
        swal({
            title: "",
            text: "",
            timer: 1,
            showConfirmButton: false
        });
    });

});

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

$("#about").click(function(event) {
    $('#show-info').modal('show');
});

$("#save-img").click(function(event) {
    swal({
        title: "Ukladanie obrázka",
        text: "Zadaj názov obrázka:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "data"
    }, function(inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("Nie je zadaný názov obrázka");
            return false;
        }
        b_draw_turtle = false;
        grid = false;
        generate();

        download_image_from_canvas(inputValue + '.png');
        b_draw_turtle = true;
        grid = true;
        generate();
        swal({
            title: "",
            text: "",
            timer: 1,
            showConfirmButton: false
        });
    });

});

function clear_commands() {
    $(".command-list ul").children().remove();
    delete_tree(); // Vymazeme strom
    clear_board(); // Vymazeme plochu
}

function get_random_color() {
    return "#" + (Math.round(Math.random() * 0XFFFFFF)).toString(16);
}

String.prototype.isNumber = function() {
    return /^\d+$/.test(this);
}

function loadsLang(lang) {
    /*fills all the span tags with class=lang pattern*/
    LANG = lang;
    $('[class^="lang"]').each(function() {
        var LangVar = (this.className).replace('lang-', '');
        var Text = window["WORDS_" + lang][LangVar];
        $(this).text(Text);
    });
}

function lang_init() {

    var $dropdown = $("#country_select");
    $.each(LanguageList, function(key, value) {
        $dropdown.
        append($("<option/>").val(key).text(value));
    });

    loadsLang(LANG);
}

function tool_sort() {
    $(".command-list ul").sortable({
        revert: true,
        connectWith: "ul",
        placeholder: "span2 placeholder",
        forceHelperSize: true,
        scroll: true,
        cursor: 'move',
        appendTo: 'body',
        start: function(e, ui) {
            ui.placeholder.height(ui.item.height());
        },
        stop: function(event, ui) {
            //reassemble($('.command-list').find('.command'));
            //draw_commands();
            generate();
        }
    }).disableSelection();
}

function tool_drop() {
    $('.command-list ul').droppable({
        accept: ".tools",
        scroll: true,
        drop: function(event, ui) {
            $(ui.draggable).removeClass('panel-body tools').removeAttr('style').html(find_command_div(ui.draggable, $(ui.draggable).parent().data('key'), -1));

            if ($(ui.draggable).hasClass('pc')) {
                $('select[name="colorpicker-picker-longlist"]').simplecolorpicker({
                    picker: true,
                    theme: 'glyphicons',
                    pickerDelay: 1000
                });
            };
            if ($(ui.draggable).hasClass('set_pen')) {
                $(".btn-group-toggle-commands").twbsToggleButtons({
                    twbsBtnSelector: ".btn"
                });
            };

            if ($(ui.draggable).hasClass('loop')) {
                $(".command-list ul").sortable({
                    connectWith: "ul",
                    placeholder: "span2 placeholder",
                    forceHelperSize: true,
                    scroll: true,
                    cursor: 'move',
                    start: function(e, ui) {
                        ui.placeholder.height(ui.item.height());
                    },
                    stop: function(event, ui) {
                        generate();
                    }
                }).disableSelection();
            };
            if ($(ui.draggable).hasClass('proc')) {
                $(".command-list ul").sortable({
                    connectWith: "ul",
                    placeholder: "span2 placeholder",
                    forceHelperSize: true,
                    scroll: true,
                    cursor: 'move',
                    start: function(e, ui) {
                        ui.placeholder.height(ui.item.height());
                    },
                    stop: function(event, ui) {
                        generate();
                    }
                }).disableSelection();
            };

            return true;


        },
    });
}

function tool_drag() { // zapuzdrime
    $(".tools").draggable({
        connectToSortable: ".command-list ul",

                helper: function() {            
            return $(find_thumbnail_div($(this), -1));        
        },

        appendTo: 'body',
        containment: 'body',
        scroll: true
    });
}

$(window).resize(function() {
    var c_height = $('#canvas').height();
    $('.command-list').css('height', '' + c_height - 12 + 'px');

    $('.command-panel').css('height', '' + (c_height + 50) + 'px');

    $('.command-list2').css('height', '' + c_height - 55 + 'px');

    $('#program_code').css('height', '' + (c_height - 85) + 'px');
});

$(window).load(function() {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");;
});



$(document).ready(function() {

    // Barla pre IE
    Object.keys = Object.keys || function keys(obj) {
        var ret = [];
        for (var prop in obj)
            if (obj.hasOwnProperty(prop)) ret.push(prop)
        return ret;
    }



    var act_dragg = null;

    lang_init();

    $('select[name="colorpicker-picker-grid-color"]').simplecolorpicker({
        picker: true,
        theme: 'glyphicons',
        pickerDelay: 1000
    });
    $('select[name="colorpicker-picker-bg-color"]').simplecolorpicker({
        picker: true,
        theme: 'glyphicons',
        pickerDelay: 1000
    });

    $(".btn-group-toggle-set").twbsToggleButtons({
        twbsBtnSelector: ".btn"
    });

    $('[data-toggle="popover"]').popover();
    $.mobile.loading().hide();

    $('input,textarea').bind('click', function() {
        $(this).focus();
    });

    var c_height = $('#canvas').height();

    $('.command-list').css('overflow', 'auto');
    //$('#commands-panel').scroll();
    $('.command-list').css('height', '' + c_height - 12 + 'px');

    $('.command-panel').css('overflow-y', 'auto');
    $('.command-panel').css('height', '' + (c_height + 50) + 'px');

    //$('.command-list2').css('overflow-y','scroll');
    $('.command-list2').css('height', '' + c_height - 55 + 'px');

    $('#program_code').css('overflow-y', 'scroll');
    $('#program_code').css('height', '' + (c_height - 85) + 'px');

    $(".loader").fadeOut("slow");;

    $('html, body').animate({
        scrollTop: $('#commands-content').offset().top
    }, 'slow');

    $(document).on("click", ".collapseOne", function(e) {
        $(this)
            .find("i.fa")
            .first()
            .toggleClass('fa-minus fa-plus');

        $(this).parent().parent().parent().find('.collapse-com').first().toggle(400);
    });


    $(document).on("click", ".fa-minus-circle", function(e) {
        var value = $(this).parent().find('.com_value').text()
        if (($(this).parent().has('.lt').length > 0) || $(this).parent().has('.rt').length > 0) {

            if (value.isNumber() && value > 0) {
                value = parseInt(value) - 45;
            }
        } else if (value.isNumber() && value > 0) {
            value = parseInt(value) - 1;
        }
        $(this).parent().find('.com_value').html(value);
        /*SPRACUJ HODNOTU DALEJ*/
        generate();
    });

    $(document).on("click", ".fa-plus-circle", function(e) {
        var value = $(this).parent().find('.com_value').text()
        if (($(this).parent().has('.lt').length > 0) || $(this).parent().has('.rt').length > 0) {
            if (value.isNumber() && value < 360) {
                value = parseInt(value) + 45;
            }
        } else if (value.isNumber() && value < 9) {
            value = parseInt(value) + 1;
        }
        $(this).parent().find('.com_value').html(value);
        /*SPRACUJ HODNOTU DALEJ*/
        generate();
    });

    $(document).on("click", ".fa-plus-square", function(e) {
        act_name_variable = next_name_variable(act_name_variable);
        $(this).parent().parent().find('.parameter-variables').append(add_new_parameter(act_name_variable)); // Pridame parameter
        prepare_parameters('#create-proc');
    });

    $(document).on("click", ".fa-times", function() {
        if ($(this).parent().hasClass('parameter_remove')) { // Vymazeme parameter

            $(this).parent().animate({
                opacity: 0.25,
                left: "+=50",
                height: "toggle"
            }, 500, function() {
                $(this).remove();
                generate();
            });
        } else if ($(this).parent().parent().hasClass('proc-call')) { // Vymazeme volania procedury
            var n_name = $(this).parent().parent().find('.call_proc_name').text();
            var proc_element = $(this).parent().parent();
            swal({
                    title: "Ste si istý?",
                    text: "Procedúra s názvom " + n_name + " bude vymazaná!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Ano, vymaž ju!",
                    closeOnConfirm: true
                },
                function(isConfirm) {
                    if (isConfirm) {

                        swal("Hotovo!", "Procedúra s názvom " + n_name + " bola vymazaná.", "success");
                        proc_element.hide("drop", {
                            direction: "right"
                        }, 'slow', function() {
                            proc_element.remove();
                        });
                        remove_procedure(n_name);
                        repair_proc_call();
                        generate();
                    }
                });

        } else { // Vymazeme prikazy
            $(this).parent().animate({
                opacity: 0.25,
                left: "+=50",
                height: "toggle"
            }, 500, function() {
                $(this).parent().parent().remove();
                generate();
            });
        }
    });

    $(document).on("click", ".activity-card", function() {
        activity_index = parseInt($(this).val());
        $("#radio_2").click();
        $("#toggle_event_editing input").change();
    });


    $(document).on("change", ".color-random", function() {

        if (this.checked) {
            $(this).parent().parent().parent().find('.comm_value').text('#random');
            generate();
            $(this).parent().parent().parent().find('.simplecolorpicker').hide(1000);
        } else {
            $(this).parent().parent().parent().find('.com_value_pc').change();
            $(this).parent().parent().parent().find('.simplecolorpicker').show(1000);
        }
    });

    $(document).on("change", "#background-color", function() {
        bg_color = $(this).val();
        draw_commands();
    });

    $(document).on("change", "#grid-color", function() {
        grid_color = $(this).val();
        draw_commands();
    });

    $(document).on("click", ".select_value", function(e) {
        var value = $(this).text();
        $(this).parent().parent().parent().find('.com_value').html(value);
        /*SPRACUJ HODNOTU DALEJ*/
        generate();

        var index = 0;
        if ($(this).parent().parent().parent().parent().hasClass('loop')) {
            index = $(this).parent().parent().parent().parent().parent().parent().parent().index();
        } else {
            index = $(this).parent().parent().parent().parent().index();
        }
        if (index == 0) {
            if ($(this).parent().hasClass('open')) {
                $('.command-list').css('overflow', 'visible');
            } else {
                $('.command-list').css('overflow', 'auto');
            }
        }
    });

    $(document).on("change", ".btn-group-toggle-commands", function() {
        generate();
    });


    $(document).on("click", ".dropdown-toggle", function() {
        var index = 0;
        if ($(this).parent().parent().parent().parent().hasClass('loop')) {
            index = $(this).parent().parent().parent().parent().parent().parent().parent().index();
        } else {
            index = $(this).parent().parent().parent().parent().index();
        }
        if (index == 0) {
            if ($(this).parent().hasClass('open')) {
                $('.command-list').css('overflow', 'visible');
            } else {
                $('.command-list').css('overflow', 'auto');
            }
        }
    });

    $(document).on("click", ".proc-name", function(e) {
        if (!$(this).hasClass('proc-call')) {
            var value = $(this).text();
            var html = $(this);
            swal({
                title: window["WORDS_" + LANG]['proc-change-title'],
                text: window["WORDS_" + LANG]['proc-change-text'],
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: value
            }, function(inputValue) {
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError(window["WORDS_" + LANG]['proc-change-error']);
                    return false;
                }
                if (!isWord(inputValue)) {
                    swal.showInputError("Nazov musia tvorit iba pismena! ");
                    return false;
                }
                html.html(inputValue);
                swal({
                    title: "",
                    text: "",
                    timer: 1,
                    showConfirmButton: false
                });
            });
        }
        /*SPRACUJ HODNOTU DALEJ*/
    });

    $(document).on("click", ".proc-remove", function(e) {
        //var proc_element = $(this).parent().parent();
        //proc_element.hide("drop",{ direction: "right" }, 'slow' ,function(){ proc_element.remove(); });
        /*SPRACUJ HODNOTU DALEJ*/
        //generate();

    });

    $(document).on("click", ".save-proc", function(e) {

        var proc_name = $(this).parent().parent().find('.proc-name').first().text();

        if (proc_name == window["WORDS_" + LANG]['procedure']) {
            $(this).parent().parent().find('.proc-name').first().click();
        } else {

            if (Exist_proc(proc_name)) {
                $('.proc-call', '#panel-commands').each(function(index, obj) {
                    if ($(obj).find('.call_proc_name').text() == proc_name) {
                        $(obj).remove();
                    }
                });
            }

            switch_commands_panel();
            insert_proc_FE(proc_name);

        }
    });

    $(document).on("click", ".proc-edit", function(e) {

        var proc_name = $(this).parent().find('.call_proc_name').first().text();
        switch_commands_panel('edit-proc', proc_name);


    });

    $(document).on("click", ".show-procedure", function(e) {

        var proc_name = $(this).parent().find('.proc-name').first().text();
        var parameters = Prepare_FE_prameters(proc_name);
        var div = '';
        for (var _i = 0, _a = Array.from(parameters.keys()); _i < _a.length; _i++) {
            var key = _a[_i];
            div += add_new_show_parameter(key);
        }

        $('#show-proc-name').html(proc_name);

        $('#show-proc-parameters').html(div);
        $('#show-proc-parameters *').prop('disabled', true);
        $('#show-proc-parameters *').attr("disabled", true);

        $('#command-list3').html(Prepare_FE_commands(proc_name));
        $('#command-list3 *').attr("disabled", true);
        $('#command-list3 *').prop('disabled', true);
        $('select[name="colorpicker-picker-longlist"]').simplecolorpicker({
            picker: true,
            theme: 'glyphicons',
            pickerDelay: 1000
        });
    });

    $(document).on("click", "#show-proc-change", function(e) {
        var proc_name = $('#show-proc-name').text();
        switch_commands_panel('edit-proc', proc_name);
    });

    $(document).on("click", "#create-procedure", function(e) {
        switch_commands_panel('new-proc');
    });

    $('#attachfile').click(function(event) {
        event.stopPropagation();
        $("#fileInput").trigger('click');
    });

    $("#fileInput").change(function(event) {
        event.stopPropagation();
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                load_file(reader.result);
            }

            reader.readAsText(file);
        } else {
            sweetAlert("Oops...", "Nesprávny formát súboru.", "error");
        }
    });

    function load_file(file) {
        clear_panel_proc();
        load_commands(file);
        tool_sort();
        tool_drag();
        tool_drop();
        $('select[name="colorpicker-picker-longlist"]').simplecolorpicker({
            picker: true,
            theme: 'glyphicons',
            pickerDelay: 1000
        });
    }



    tool_sort();
    tool_drag();
    tool_drop();



    $('#checkbox').click(function() {
        if (document.getElementById('checkbox').checked) {
            grid = true;
        } else {
            grid = false;
        }
        generate();
    });


    $("#clear_commands").click(function(event) {
        clear_commands();
    });

    $("#program-run").click(function(event) {
        var text_commands = $('#program_code').val();
        try {
            draw_command_line(text_commands);
            $("#com_alert").removeClass('alert_info alert_alert');
            $("#com_alert").addClass('alert_success');
            $("#com_alert").html("<strong>" + window["WORDS_" + LANG]['success'] + "</strong> " + window["WORDS_" + LANG]['commands-are-successfull-execute']);
        } catch (err) {
            $("#com_alert").removeClass('alert_info alert_success');
            $("#com_alert").addClass('alert_alert');
            var error = "<strong>" + window["WORDS_" + LANG]['error'] + "</strong> " + err;
            $("#com_alert").html(error);
        }

    });


    $("#right_button").on("click", function() {
        if (activity_index + 1 < aktivity.length) {
            activity_index++;

            var act = aktivity[activity_index].activity;
            var act_image = aktivity[activity_index].image;
            if ((act_image === undefined) || (act_image == '')) {
                act_image = 'prazdny.png';
            }
            $('#activity_level').html(window["WORDS_" + LANG]['level'] + ' ' + String(activity_index + 1));
            $('#activity_content').html(act);
            var imageObj = new Image();
            imageObj.onload = function() {
                draw_image(imageObj);
                generate();
            };
            imageObj.src = "WL/Aktivity/" + act_image;
        }
    });

    $("#left_button").on("click", function() {
        if (activity_index - 1 >= 0) {
            activity_index--;

            var act = aktivity[activity_index].activity;
            var act_image = aktivity[activity_index].image;
            if ((act_image === undefined) || (act_image == '')) {
                act_image = 'prazdny.png';
            }
            $('#activity_level').html(window["WORDS_" + LANG]['level'] + ' ' + String(activity_index + 1));
            $('#activity_content').html(act);
            var imageObj = new Image();
            imageObj.onload = function() {
                draw_image(imageObj);
                generate();
            };
            imageObj.src = "WL/Aktivity/" + act_image;
        }
    });

    $('#toggle_event_editing input').on('change', function() {
        var set_value = $('input[name=options]:checked', '#toggle_event_editing').val();
        if (prev_value == 4 && set_value != 4) {
            SUBROUTINES = new Map(tmp_SUBROUTINES);
        }

        if (!execute_commands) {
            switch_commands_panel('close');
        }

        if (set_value == 1) {
            $('#activity_box').hide(1000);
            $('#create-proc').hide(1000);
            $('#area').hide(1000);
            $('#cards').hide(1000);
            activity = false;
            $('#commands-content').show(1000);
            $('#commands-panel').show(1000);
            $('#panel_comm').show(1000);

            generate();
            prev_value = 1;
        } else if (set_value == 2) {
            $('#cards').hide(1000);
            $('#create-proc').hide(1000);
            $('#area').hide(1000);
            $('#activity_box').show('slow');
            activity = true;
            $('#commands-content').show(1000);
            $('#commands-panel').show(1000);
            $('#panel_comm').show(1000);
            //$('#right_button').click();

            var act = aktivity[activity_index].activity;
            var act_image = aktivity[activity_index].image;
            $('#activity_level').html(window["WORDS_" + LANG]['level'] + ' ' + String(activity_index + 1));
            $('#activity_content').html(act);
            var imageObj = new Image();
            imageObj.onload = function() {
                draw_image(imageObj);
                generate();
            };
            imageObj.src = "WL/Aktivity/" + act_image;
            prev_value = 2;
        } else if (set_value == 3) {
            $('#activity_box').hide(1000);
            $('#commands-content').hide(1000);
            $('#create-proc').hide(1000);
            $('#area').hide(1000);
            $('#cards').show(1000);
            prev_value = 3;
        } else if (set_value == 4) {
            $('#commands-panel').hide(1000);
            $('#panel_comm').hide(1000);
            $('#create-proc').hide(1000);
            $('#area').show(1000);
            generate();
            $('#program_code').val(Get_code());
            $('#program_code').focus();
            $("#com_alert").removeClass('alert_alert alert_success');
            $("#com_alert").addClass('alert_info');
            $("#com_alert").html("&nbsp;");

            // Aby sme si neprepisali prikazy na FE
            tmp_SUBROUTINES = new Map(SUBROUTINES);
            prev_value = 4;
        }
    });

});

var activity = false;

$('#activity_box').hide();
$('#cards').hide();

function insert_proc_FE(proc_name) {
    repair_proc_call();

    var table = document.getElementById('panel-commands');
    var rowLength = table.rows.length;

    for (var i = 0; i < rowLength; i += 1) {
        var row = table.rows[i];

        var cellLength = row.cells.length;
        for (var y = 0; y < cellLength; y += 1) {
            var cell = row.cells[y];
            if (cell.children.length == 0) {
                var proc = create_command_proc(proc_name);
                cell.appendChild(proc);
                tool_drag();
                return;
            }

        }
    }

    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.appendChild(create_command_proc(proc_name));
    cell2.setAttribute("style", "min-height:110px;");

    tool_drag();
}

function clear_panel_proc() {
    $('.proc-call', '#panel-commands').each(function(index, obj) {
        $(obj).remove();
    });
}

// Funkcia posetuje parametre na FE
function prepare_parameters(id_name) {
    if (typeof(id_name) === 'undefined') id_name = '#commands-panel';
    var variables = [];

    $(id_name).find('.command').each(function(index, obj) {
        var com_value = $(obj).find('.com_value').first().text();
        var right_value = false;
        //console.log(com_value);

        if ($(obj).hasClass('com-end')) {
            variables.pop();
        }


        if ($(obj).hasClass('proc-createee')) {
            parameters = [];
            $(obj).find('.parameter').each(function(index, objj) {
                parameters.push($(objj).find('.com_variable').text());
            });
            variables.push(parameters);
        } else if (id_name == '#create-proc') {
            parameters = [];
            if (!$(obj).hasClass('call_procedure')) {
                $(obj).find('.parameter-variables').first().find('.parameter').each(function(index, objj) {
                    parameters.push($(objj).find('.com_variable').text());
                });
            }
            variables.push(parameters);
        }

        $(obj).find('.com-parameter').remove();
        var index = false;
        for (var i = 0; i < variables.length; i++) {
            for (var j = 0; j < variables[i].length; j++) {
                // setne parametre
                if (!index) {
                    if ((!$(obj).find('.pagination2').parent().parent().parent().hasClass('lt')) && (!$(obj).find('.pagination2').parent().parent().parent().hasClass('rt'))) {
                        $(obj).find('.pagination2').append('<a class="select_value com-parameter" style="cursor:pointer;">' + variables[i][j] + '</a>');
                    }
                }
                if (variables[i][j] == "index") {
                    index = true;
                }
            }
        }

        if ($(obj).hasClass('loop')) {
            variables.push(['index']);
        }


        for (var i = 0; i < variables.length; i++) {
            for (var j = 0; j < variables[i].length; j++) {
                if (variables[i][j] == com_value) {
                    right_value = true;
                }
            }
        }


        if (!right_value) {
            //console.log(obj);
            if (!com_value.isNumber() && com_value != "") {
                //console.log("Treba nastavit");
                //console.log(obj);
                $(obj).find('.com_value').first().html("0");
            }
        }
    });
}

function next_name_variable(str) {
    if (!str)
        return 'A';

    let tail = ''
    let i = str.length - 1
    let char = str[i]

    while (char === 'Z' && i > 0) {
        i--
        char = str[i]
        tail = 'A' + tail
    }
    if (char === 'Z')
        return 'AA' + tail
    return str.slice(0, i) + String.fromCharCode(char.charCodeAt(0) + 1) + tail
}

function set_color(vthis) {
    $(vthis).parent().parent().find('.comm_value').text($(vthis).val());
    generate();
}

function set_text(vthis) {
    generate();
}

function set_draw() {
    if ($('#draw_check').is(':checked')) {
        $("#clear_draw").show("slow");
        free_draw = true;
        $(canvas).css("cursor", "crosshair");
    } else {
        $("#clear_draw").hide("slow");
        free_draw = false;
        $(canvas).css("cursor", "default");
    }
}

function clear_draw() {}

function create_cards() {
    for (var i = 0; i < aktivity.length; i++) {
        var act = aktivity[i].activity;
        var card = add_card(aktivity[i].image, window["WORDS_" + LANG]['level'], (i + 1), aktivity[i].activity, i);
        $('#cards').append(card);
    }
}
create_cards();

function init_create_proc(name) {
    var new_proc = false;
    if (typeof(name) === 'undefined') {
        count_proc += 1;
        name = window["WORDS_" + LANG]['procedure'] + count_proc;
        new_proc = true;
    }
    $('#create-proc').find('.proc-name').html(name);
    $('#create-proc').find('.parameter-variables').empty();
    $('#create-proc').find('.command-list ul').empty();

    if (!new_proc) {

        var parameters = Prepare_FE_prameters(name);
        //console.log(parameters);
        var div = '';
        for (var _i = 0, _a = Array.from(parameters.keys()); _i < _a.length; _i++) {
            var key = _a[_i];
            div += add_new_parameter(key);
        }

        $('#create-proc').find('.parameter-variables').append(div);


        $('#create-proc').find('.command-list ul').html(Prepare_FE_commands(name));

        tool_sort();
        tool_drag();
        tool_drop();
        $('select[name="colorpicker-picker-longlist"]').simplecolorpicker({
            picker: true,
            theme: 'glyphicons',
            pickerDelay: 1000
        });
        prepare_parameters('#create-proc');
    }
}


function switch_commands_panel(type, name) {
    if (type == 'close') {
        execute_commands = true;
        set_bg_color('ffffff');
        generate();
        $('#create-proc').hide(1000);
        $('#commands-panel').show(1000);

        $('#create-procedure').show();

        $('.proc-call', '#panel_comm').each(function(index, obj) {
            $('*', obj).prop("disabled", false);
            $(obj).draggable('enable')
        });
    } else if (type == 'edit-proc') {
        set_bg_color('F5F5F5');
        generate();
        execute_commands = false;
        $('#commands-panel').hide();
        $('#create-proc').show(1000);
        $('#create-procedure').hide(1000);

        // ak nahodou uz sme v edit mode a preklineme na dalsi edit
        $('.proc-call', '#panel_comm').each(function(index, obj) {
            $('*', obj).prop("disabled", false);
            $(obj).draggable('enable')
        });

        $('.proc-call', '#panel_comm').each(function(index, obj) {
            // zakazeme rekurziu
            var proc_name = $(obj).find('.call_proc_name').text();
            if (proc_name == name) {
                $('*', obj).prop("disabled", true);
                $(obj).draggable('disable')
            }
        });
        init_create_proc(name);
    } else if (type == 'new-proc') {
        set_bg_color('F5F5F5');
        generate();
        execute_commands = false;
        $('#commands-panel').hide();
        $('#create-proc').show(1000);
        $('#create-procedure').hide(1000);

        init_create_proc();
    } else {
        execute_commands = true;
        set_bg_color('ffffff');
        //if (name != 'close'){
        generate('#create-proc');
        //}
        $('#create-proc').hide(1000);
        $('#commands-panel').show(1000);

        $('#create-procedure').show();

        $('.proc-call', '#panel_comm').each(function(index, obj) {
            $('*', obj).prop("disabled", false);
            $(obj).draggable('enable')
        });

        generate();
    }
}

$("#close_create").click(function(event) {

    var proc_name = $(this).parent().parent().find('.proc-name').first().text();

    if (proc_name == window["WORDS_" + LANG]['procedure']) {
        $(this).parent().parent().find('.proc-name').first().click();
    } else {

        if (Exist_proc(proc_name)) {
            $('.proc-call', '#panel-commands').each(function(index, obj) {
                if ($(obj).find('.call_proc_name').text() == proc_name) {
                    $(obj).remove();
                }
            });
        }

        //swal("Super!", "Procedúra s názvom "+proc_name+" bola uložená.", "success")
        switch_commands_panel();
        insert_proc_FE(proc_name);

    }

    //switch_commands_panel('close');		

});

function repair_proc_call() {

    $('.command', '#commands-panel').each(function(index, obj) {
        if ($(obj).hasClass('proc')) {

            var proc_name = $(obj).find('.proc-name').first().text();
            if (!Exist_proc(proc_name)) { // Ak neexistuje, vymazeme z FE volania
                $(obj).animate({
                    opacity: 0.25,
                    left: "+=50",
                    height: "toggle"
                }, 500, function() {
                    $(this).remove();
                });
            } else { // Upravime volania parametrov na FE
                var params = new Map(Prepare_FE_prameters(proc_name));
                //console.log(params);
                //console.log(obj);


                $(obj).find('.parameter-variables').find('.parameter').each(function(index, objj) {
                    var name = $(objj).find('.com_variable').first().text();
                    var value = $(objj).find('.com_value').first().text();
                    if (!params.has(name)) {
                        // pouzivatel vymazal hodnotu, zmenime aj na FE volanie
                        $(objj).remove();
                        params.delete(name);
                        //console.log(name);
                    }

                });

                $(obj).find('.parameter-variables').find('.parameter').each(function(index, objj) {
                    var name = $(objj).find('.com_variable').first().text();
                    var value = $(objj).find('.com_value').first().text();
                    if (params.has(name)) {
                        // parameter ostal
                        params.delete(name);
                    }

                });

                // pridame parametre navyse

                for (var _i = 0, _a = Array.from(params.keys()); _i < _a.length; _i++) {
                    var key = _a[_i];
                    $(obj).find('.parameter-variables').append(insert_parameter(key));

                }
            }

        }
    });
}