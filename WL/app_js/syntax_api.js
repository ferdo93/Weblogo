 /*------------------------------------------------------
 
            Vytvoril: Ferdinand Križan
 
 ------------------------------------------------------*/

const INSTRUCTION_FD = "forward";
const INSTRUCTION_LT = "left";
const INSTRUCTION_RT = "right";
const INSTRUCTION_PW = "weight";
const INSTRUCTION_PC = "color";
const INSTRUCTION_LOOP = "loop";
const INSTRUCTION_PT = "point";
const INSTRUCTION_PROC = "procedure";
const INSTRUCTION_PEN = "pen";
const INSTRUCTION_TEXT = "pen_text";
const INSTRUCTION_UP = "up";
const INSTRUCTION_DOWN = "down";


function get_instruction(token){
	for (var key in commands_type){
		for (var language in commands_type[key]){
			if (token == commands_type[key][language]){
				return key;
			}
		}
	}
}

function get_command(instruction, lang){
	for (var key in commands_type){
		if (key == instruction){
			for (var language in commands_type[key]){
				if (lang == language){
					return commands_type[key][language];
				}
			}
		}
	}	
}
