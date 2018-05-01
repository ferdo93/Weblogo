 /*------------------------------------------------------
 
            Vytvoril: Ferdinand Križan
 
 ------------------------------------------------------*/

function create_dropup(rotate) {
    var div = '';
    div += '<div class="dropdown-menu " style="	margin:0; padding: 0;">';
    div += '<div class="pagination2">';
    if (!rotate) {
        div += '<a class="select_value" style="cursor:pointer;">1</a>';
        div += '<a class="select_value" style="cursor:pointer;">2</a>';
        div += '<a class="select_value" style="cursor:pointer;">3</a>';
        div += '<a class="select_value" style="cursor:pointer;">4</a>';
        div += '<a class="select_value" style="cursor:pointer;">5</a>';
        div += '<a class="select_value" style="cursor:pointer;">6</a>';
        div += '<a class="select_value" style="cursor:pointer;">7</a>';
        div += '<a class="select_value" style="cursor:pointer;">8</a>';
        div += '<a class="select_value" style="cursor:pointer;">9</a>';
    } else {
        div += '<a class="select_value" style="cursor:pointer;">0</a>';
        div += '<a class="select_value" style="cursor:pointer;">45</a>';
        div += '<a class="select_value" style="cursor:pointer;">90</a>';
        div += '<a class="select_value" style="cursor:pointer;">135</a>';
        div += '<a class="select_value" style="cursor:pointer;">180</a>';
        div += '<a class="select_value" style="cursor:pointer;">225</a>';
        div += '<a class="select_value" style="cursor:pointer;">270</a>';
        div += '<a class="select_value" style="cursor:pointer;">315</a>';
        div += '<a class="select_value" style="cursor:pointer;">360</a>';
    }
    div += '</div>';
    div += '</div>';
    return div;
}

function command_div_forward(name, value) {
    var div = '<div><div class="row body list-group-item command fd" style="margin: 0px;  margin-bottom: 2%;">';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered"><span class="lang-forward hidden-xs">' + name + '</span><span class="visible-xs"><i class="fa fa-level-up" aria-hidden="true"></i></span></p>';
    div += '<i class="fa fa-times col-centered pull-right" aria-hidden="true" style="color:red; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';
    div += '<button class="btn btn-success fa fa-plus-circle col-sm-2 col-centered pull-right" type="button"></button>';
    div += '<div class="dropup">';
    div += '<a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-default fa col-sm-2 text pull-right num_value"><b class="com_value">' + value + '</b><b class="caret"></b></a>';
    div += create_dropup();
    div += '</div>';
    div += ' <button class="btn btn-warning fa fa-minus-circle col-sm-2 col-centered pull-right" type="button"></button>';
    div += '</div></div>';
    return div;
}

function command_div_left(name, value) {
    var div = '<div><div class="row body list-group-item command lt" style="margin: 0px;  margin-bottom: 2%;">';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered"><span class="lang-left hidden-xs">' + name + '</span><span class="visible-xs"><i class="fa fa-arrow-left" aria-hidden="true"></i></span></p>';
    div += '<i class="fa fa-times col-centered pull-right" aria-hidden="true" style="color:red; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';
    div += '<button class="btn btn-success fa fa-plus-circle col-sm-2 col-centered pull-right" type="button"></button>';
    div += '<div class="dropup">';
    div += '<a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-default fa col-sm-2 text pull-right num_value"><b class="com_value lt">' + value + '</b><b class="caret"></b></a>';
    div += create_dropup(true);
    div += '</div>';
    div += ' <button class="btn btn-warning fa fa-minus-circle col-sm-2 col-centered pull-right" type="button"></button>';
    div += '</div></div>';
    return div;
}

function command_div_right(name, value) {
    var div = '<div><div class="row body list-group-item command rt" style="margin: 0px;  margin-bottom: 2%;">';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered"><span class="lang-right hidden-xs">' + name + '</span><span class="visible-xs"><i class="fa fa-arrow-right" aria-hidden="true"></i></span></p>';
    div += '<i class="fa fa-times col-centered pull-right" aria-hidden="true" style="color:red; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';
    div += '<button class="btn btn-success fa fa-plus-circle col-sm-2 col-centered pull-right" type="button"></button>';
    div += '<div class="dropup">';
    div += '<a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-default fa col-sm-2 text pull-right num_value"><b class="com_value rt">' + value + '</b><b class="caret"></b></a>';
    div += create_dropup(true);
    div += '</div>';
    div += ' <button class="btn btn-warning fa fa-minus-circle col-sm-2 col-centered pull-right" type="button"></button>';
    div += '</div></div>';
    return div;
}

function command_div_pw(name, value) {
    var div = '<div><div class="row body list-group-item command pw" style="margin: 0px;  margin-bottom: 2%;">';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered"><span class="lang-pen-weight hidden-xs">' + name + '</span><span class="visible-xs"><i class="fa fa-align-justify" aria-hidden="true"></i></span></p>';
    div += '<i class="fa fa-times col-centered pull-right" aria-hidden="true" style="color:red; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';
    div += '<button class="btn btn-success fa fa-plus-circle col-sm-2 col-centered pull-right" type="button"></button>';
    div += '<div class="dropup">';
    div += '<a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-default fa col-sm-2 text pull-right num_value"><b class="com_value">' + value + '</b><b class="caret"></b></a>';
    div += create_dropup();
    div += '</div>';
    div += ' <button class="btn btn-warning fa fa-minus-circle col-sm-2 col-centered pull-right" type="button"></button>';
    div += '</div></div>';
    return div;
}

function command_div_point_old(name, value) {
    var div = '<div><div class="row body list-group-item command point" style="margin: 0px;  margin-bottom: 2%;">';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered"><span class="lang-point hidden-xs">' + name + '</span><span class="visible-xs"><i class="fa fa-circle" aria-hidden="true"></i></span></p>';
    div += '<i class="fa fa-times col-centered pull-right" aria-hidden="true" style="color:red; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';
    div += '<button class="btn btn-success fa fa-plus-circle col-sm-2 col-centered pull-right" type="button"></button>';
    div += '<div class="dropup">';
    div += '<a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-default fa col-sm-2 text pull-right num_value"><b class="com_value">' + value + '</b><b class="caret"></b></a>';
    div += create_dropup();
    div += '</div>';
    div += ' <button class="btn btn-warning fa fa-minus-circle col-sm-2 col-centered pull-right" type="button"></button>';
    div += '</div> </div>';
    return div;
}

function command_div_time(name, value) {
    var div2 = document.createElement('div');
    var div = '<div class="row body list-group-item command time" style="margin: 0px;  margin-bottom: 2%;">';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered"><span class="lang-time hidden-xs">' + name + '</span><span class="visible-xs"></span></p>';
    div += '<i class="fa fa-times col-centered pull-right" aria-hidden="true" style="color:red; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';
    div += '<button class="btn btn-success fa fa-plus-circle col-sm-2 col-centered pull-right" type="button"></button>';
    div += '<div class="dropup">';
    div += '<a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-default fa col-sm-2 text pull-right num_value"><b class="com_value">' + value + '</b><b class="caret"></b></a>';
    div += '<ul class="dropdown-menu" style="left:auto; right:0; margin:0; padding:0; line-height:0.8;">';
    div += '<ul class="pagination pagination-responsive pagination-sm" style="margin:0;">';
    div += '<li><a class="select_value" style="cursor:pointer;">1</a></li><li><a class="select_value" style="cursor:pointer;">2</a></li><li><a class="select_value" style="cursor:pointer;">3</a></li><li><a class="select_value" style="cursor:pointer;">4</a></li><li><a class="select_value" style="cursor:pointer;">5</a></li><li><a class="select_value" style="cursor:pointer;">6</a></li><li><a class="select_value" style="cursor:pointer;">7</a></li><li><a class="select_value" style="cursor:pointer;">8</a></li><li><a class="select_value" style="cursor:pointer;">9</a></li>';
    div += '</ul>';
    div += '<ul class="pagination pagination-responsive pagination-sm com-parameter" style="margin:0;"></ul>';
    div += '</ul>';
    div += '</div>';
    div += ' <button class="btn btn-warning fa fa-minus-circle col-sm-2 col-centered pull-right" type="button"></button>';
    div += '</div>';
    $(div2).append(div)
    $(div2).data("key", n_key);
    return div2;
}

function command_div_text(name, value) {
    var div = '<div><div class="row body list-group-item command word_text" style="margin: 0px;  margin-bottom: 2%;">';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered"><span class="lang-text_word hidden-xs">' + name + '</span><span class="visible-xs"><i class="fa fa-text-width" aria-hidden="true"></i></span></p>';
    div += '<i class="fa fa-times col-centered pull-right" aria-hidden="true" style="color:red; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';
    div += '<div class="">';
    div += '<div class="input-group">';
    div += '<input type="text" class="form-control comm_value glyphicon glyphicon-text-size" placeholder="text" value="' + value.replace(/_/g, ' ') + '" onKeyPress="javascript:set_text(this);">';
    div += '</div>';
    div += '</div>';
    div += '</div></div>';
    return div;
}

function command_div_set_pen_up(name, value) {
    var div = '<div><div class="row body list-group-item command set_pen_up" style="margin: 0px;  margin-bottom: 2%;">';
    div += '<p class="col-lg-4 col-md-4 col-sm-3 col-xs-3 col-centered"><span class="lang-set_pen hidden-xs">' + name + '</span><span class="visible-xs"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> </span></p>';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered"><span class="lang-pen_up">' + value + '</span></p>';
    div += '<i class="fa fa-times col-centered pull-right" aria-hidden="true" style="color:red; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';
    div += '<div style="display:none" class="com_value_pen">' + value + '</div>';
    div += '</div> </div>';
    return div;
}

function command_div_set_pen_down(name, value) {
    var div = '<div><div class="row body list-group-item command set_pen_down" style="margin: 0px;  margin-bottom: 2%;">';
    div += '<p class="col-lg-4 col-md-4 col-sm-3 col-xs-3 col-centered"><span class="lang-set_pen hidden-xs">' + name + '</span> <span class="visible-xs"><i class="fa fa-pencil-square" aria-hidden="true"></i></span></p>';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered"><span class="lang-pen_down">' + value + '</span></p>';
    div += '<i class="fa fa-times col-centered pull-right" aria-hidden="true" style="color:red; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';
    div += '<div style="display:none" class="com_value_pen">' + value + '</div>';
    div += '</div></div>';
    return div;
}

function command_div_pc(name, value) {
    var div = '<div><div class="row body list-group-item command pc" style="margin: 0px;  margin-bottom: 2%;">';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered"><span class="lang-pen_color hidden-xs">' + name + '</span><span class="visible-xs"><i class="fa fa-paint-brush" aria-hidden="true"></i></span></p>';
    div += '<div class="btn btn-xs pull-left" style="padding-right: 10%"><label><input type="checkbox" value="" class="color-random" id="checkbox" ';
    if (value == '#random') {
        div += 'checked ';
    }
    div += '>Náhodne</label></div>';
    div += '<span class="comm_value" style="display: none">' + value + '</span>'
    div += '<select name="colorpicker-picker-longlist" class="com_value_pc" onchange="set_color(this)">';
    div += '<option value="#000000">#000000</option>';
    div += '<option value="#ac725e">#ac725e</option>';
    div += '<option value="#d06b64">#d06b64</option>';
    div += '<option value="#f83a22">#f83a22</option>';
    div += '<option value="#fa573c">#fa573c</option>';
    div += '<option value="#ff7537">#ff7537</option>';
    div += '<option value="#ffad46">#ffad46</option>';
    div += '<option value="#42d692">#42d692</option>';
    div += '<option value="#16a765">#16a765</option>';
    div += '<option value="#7bd148">#7bd148</option>';
    div += '<option value="#b3dc6c">#b3dc6c</option>';
    div += '<option value="#fbe983">#fbe983</option>';
    div += '<option value="#fad165">#fad165</option>';
    div += '<option value="#92e1c0">#92e1c0</option>';
    div += '<option value="#9fe1e7">#9fe1e7</option>';
    div += '<option value="#9fc6e7">#9fc6e7</option>';
    div += '<option value="#4986e7">#4986e7</option>';
    div += '<option value="#9a9cff">#9a9cff</option>';
    div += '<option value="#b99aff">#b99aff</option>';
    div += '<option value="#c2c2c2">#c2c2c2</option>';
    div += '<option value="#cca6ac">#cca6ac</option>';
    div += '<option value="#f691b2">#f691b2</option>';
    div += '<option value="#cd74e6">#cd74e6</option>';
    div += '<option value="#a47ae2">#a47ae2</option>';
    div += '</select>';
    div += '<i class="fa fa-times col-centered pull-right" aria-hidden="true" style="color:red; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';
    div += '</div></div>';
    return div;
}

function command_div_loop(name, end_name, value) {
    var div = '<div><div class="ui-draggable" style="display: block;">';
    div += '<div class="row body list-group-item panel panel-warning panel-collapse command loop" style="margin: 0px; margin-bottom:2; padding: 0px; margin-bottom: 2%;">';
    div += '<div class="panel-heading">';
    div += '<div>';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered"><span class="lang-loop hidden-xs">' + name + '</span><span class="visible-xs"><i class="fa fa-repeat" aria-hidden="true"></i></span></p> ';
    div += '<i class="fa fa-times col-centered pull-right" style="color:red; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';
    div += '<button class="btn btn-success fa fa-plus-circle col-sm-2 pull-right" type="button"></button>';
    div += '<div class="dropup">';
    div += '<a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-default fa col-sm-2 text pull-right num_value">';
    div += '<b class="com_value">' + value + '</b>';
    div += '<b class="caret"></b>';
    div += '</a>';
    div += create_dropup();
    div += '</div>';
    div += '<button class="btn btn-warning fa fa-minus-circle col-sm-2 pull-right" type="button"></button>';
    div += '<button class="btn btn-box-tool collapseOne" aria-expanded="true" type="button"><i class="fa fa-minus"></i></button>';
    div += '</div>';
    div += '</div>';
    div += '<div class="panel-collapse collapse-com in" aria-expanded="true">';
    div += '<div class="panel-body command-loop" style="padding: 10px 0px;"><ul class="list-unstyled ui-sortable" style="margin: 0; margin-left: 3%;">';
    div += '<li></li></ul>';
    div += '</div>';
    div += '<div class="panel-footer text-center command com-end">';
    div += '<p class="col-centered"><span class="lang-end-loop">' + end_name + '</span></p>';
    div += '</div>';
    div += '</div>';
    div += '</div>';
    div += '</div></div>';
    return div;
}

function command_proc_call_load(name, parameters) {
    var div = '<div><div class="ui-draggable" style="display: block;">';
    div += '<div class="ui-draggable proc-call" style="display: block;">';
    div += '<div class="row body list-group-item panel panel-info panel-collapse command call_procedure proc ' + name + '" style="margin: 0px; padding: 0px;  margin-bottom: 2%;">';
    div += '<div class="panel-heading">';
    div += '<div class="row text-center">';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered proc-name" style="cursor: pointer"><span class="">' + name + '</span> </p> ';
    div += '<button class="btn btn-box-tool pull-left show-procedure" data-toggle="modal" data-target="#show-proc" aria-expanded="true" type="button"><i class="fa fa-2x fa-list-alt"></i></button>';
    div += '<i class="fa fa-times col-centered pull-right" style="color:red; padding:5px; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';

    div += '<div class="row" ><div class="parameter-variables" style="text-align: center">';
    div += insert_parameters_prop(parameters);
    div += '</div></div>';
    div += '</div>';
    div += '</div>';
    div += '</div>';
    div += '</div>';
    div += '</div></div>';
    return div;
}

function command_proc_call(name, value, parameters) {
    var div = '<div><div class="ui-draggable" style="display: block;">';
    div += '<div class="ui-draggable proc-call" style="display: block;">';
    div += '<div class="row body list-group-item panel panel-info panel-collapse command call_procedure proc ' + name + '" style="margin: 0px; padding: 0px;  margin-bottom: 2%;">';
    div += '<div class="panel-heading">';
    div += '<div class="row text-center">';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered proc-name proc-call" style="cursor: pointer"><span class="">' + name + '</span></p> ';
    div += '<button class="btn btn-box-tool pull-left show-procedure" data-toggle="modal" data-target="#show-proc" aria-expanded="true" type="button"><i class="fa fa-2x fa-list-alt"></i></button>';
    div += '<i class="fa fa-times col-centered pull-right" style="color:red; padding:5px; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';

    div += '<div class="row" ><div class="parameter-variables" style="text-align: center">';
    div += insert_parameters(parameters);
    div += '</div></div>';
    div += '</div>';
    div += '</div>';
    div += '</div>';
    div += '</div>';
    div += '</div></div>';
    return div;
}

function insert_parameter(key) {
    var div = '';
    div += '<div class="dropup text-center parameter" style="display:inline-block; padding: 1%">';
    div += '<a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-warning text num_value text-center">';
    div += '<b class="com_variable">' + key + '</b><b>:</b><b class="com_value">0</b><b class="caret"></b>';
    div += '</a>';
    div += create_dropup();
    div += '</div>';
    return div;
}

function insert_parameters(parameters) {
    var div = '';
    for (var _i = 0, _a = Array.from(parameters.keys()); _i < _a.length; _i++) {
        var key = _a[_i];
        div += insert_parameter(key);
    }
    return div;
}

function insert_parameters_prop(parameters) {
    var div = '';
    for (var _i = 0, _a = Array.from(parameters.keys()); _i < _a.length; _i++) {
        var key = _a[_i];
        var value = parameters.get(key);
        div += '<div class="dropup text-center parameter" style="display:inline-block; padding: 1%">';
        div += '<a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-warning text num_value text-center">';
        div += '<b class="com_variable">' + key + '</b><b>:</b><b class="com_value">' + value + '</b><b class="caret"></b>';
        div += '</a>';
        div += create_dropup();
        div += '</div>';
    }
    return div;
}

function create_command_proc(name) {

    var div = document.createElement('div');
    $(div).addClass('panel-body tools proc-call').css('cursor', 'pointer');
    $(div).append('<small class="text-center call_proc_name">' + name + '<i class="fa fa-times proc-remove" aria-hidden="true" style="float:right; color:red; padding:2%; padding-left: 0px;"></i></small>');
    $(div).append('<img src="WL/app_images/package.png" class="img-responsive" alt="Cinque Terre">');
    $(div).append('<button class="btn btn-success proc-edit" type="button">Zmen</button>');
    return div;
}

function command_div_loop_first_part(name, value) {
    var div = '<div><div class="ui-draggable" style="display: block;">';
    div += '<div class="row body list-group-item panel panel-warning panel-collapse command loop" style="margin: 0px; margin-bottom:2; padding: 0px; margin-bottom: 2%;">';
    div += '<div class="panel-heading">';
    div += '<div>';
    div += '<p class="col-lg-3 col-md-3 col-sm-2 col-xs-2 col-centered"><span class="lang-loop">' + name + '</span><span class="visible-xs"><i class="fa fa-repeat" aria-hidden="true"></i></span></p> ';
    div += '<i class="fa fa-times col-centered pull-right" style="color:red; padding-left:5%; padding-top:0px;cursor:pointer;"></i>';
    div += '<button class="btn btn-success fa fa-plus-circle col-sm-2 pull-right" type="button"></button>';
    div += '<div class="dropup">';
    div += '<a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-default fa col-sm-2 text pull-right num_value">';
    div += '<b class="com_value">' + value + '</b>';
    div += '<b class="caret"></b>';
    div += '</a>';
    div += create_dropup();
    div += '</div>';
    div += '<button class="btn btn-warning fa fa-minus-circle col-sm-2 pull-right" type="button"></button>';
    div += '<button class="btn btn-box-tool collapseOne" aria-expanded="true" type="button"><i class="fa fa-minus"></i></button>';
    div += '</div>';
    div += '</div>';
    div += '<div class="panel-collapse collapse-com in" aria-expanded="true">';
    div += '<div class="panel-body command-loop" style="padding: 10px 0px;">';
    div += '<ul class="list-unstyled ui-sortable" style="margin: 0; margin-left: 3%; min-height: 3%">';
    return div;
}

function command_div_loop_second_part(end_name) {
    var div = '';
    div += '<li></li></ul>';
    div += '</div>';
    div += '<div class="panel-footer text-center command com-end">';
    div += '<p class="col-centered"><span class="lang-end-loop">' + end_name + '</span></p>';
    div += '</div>';
    div += '</div>';
    div += '</div>';
    div += '</div></div>';
    return div;
}

function add_new_parameter(variable) {
    var div = '';
    div += '<div class="dropup text-center parameter parameter_remove" style="display:inline-block; padding: 1%">';
    div += '<a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-warning text num_value text-center">';
    div += '<b class="com_variable">' + variable + '</b>';
    div += '</a>';
    div += '<i class="fa fa-times col-centered pull-right" aria-hidden="true" style="color:red; padding-top:0px;cursor:pointer;"></i>';
    div += '</div>';
    return div;
}

function add_new_show_parameter(variable) {
    var div = '';
    div += '<div class="dropup text-center parameter parameter_remove" style="display:inline-block; padding: 1%">';
    div += '<a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-warning text num_value text-center">';
    div += '<b class="com_variable">' + variable + '</b>';
    div += '</a>';
    div += '</div>';
    return div;
}



function add_card(img_path, title, number, desc, index) {
    if ((img_path === undefined) || (img_path == '')) {
        img_path = 'prazdny.png';
    }
    var div = '<div class="item  col-xs-2 col-lg-2">';
    div += '<div class="thumbnail img-responsive">';
    div += '<img class="group list-group-image" src="WL/Aktivity/' + img_path + '" alt="" />';
    div += '<div class="caption">';
    div += '<h4 class="group inner list-group-item-heading text-center"><b><span class="lang-level">' + title + '</span><span>	&nbsp;' + number + '</span></b></h4>';
    div += '<p class="group inner list-group-item-text row text-center" style="min-height: 50px">' + desc + '</p>';
    div += '<br>';
    div += '<div class="row">';
    div += '<div class="text-center">';
    div += '<button type="button" class="btn btn-success activity-card" value="' + index + '"><span class="lang-run-activity"></span></button>';
    div += '</div>';
    div += '</div>';
    div += '</div>';
    div += '</div>';
    div += '</div>';
    return div;
}