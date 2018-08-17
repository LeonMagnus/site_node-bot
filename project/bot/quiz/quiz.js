const fs = require("fs");
//pour importe les question du quiz
var question = require("./question.json");
//pour importe + enrengistre les score de la perssone avec son name
var score = {};

/*var scores = fs.readFileSync("./score.json");
score = JSON.parse(scores);*/
//solution tomporaire
var ok = false;
//pour le numeraux du quiz
var num;
//cree un systeme pour choisir des question au hasard

//les cmd
var commands = [
//cmd 1
	{
		command: "play",
		description: "pour joue aux quiz",
		execute: (mes) => {
			if (!ok) {
				num = 1;
				mes.message = "";
				mes = quiz(mes, num);
				ok = true;
			}
			else
				mes.message = "tu es deja entrein de joue ";
			return mes;
		}
	},
//cmd 2
	{
		command: "score",
		description: "pour voir les score",
		execute: (mes) => {
			mes.message = "cmd 2 en cour";
			return mes;
		}
	},
	//cmd 3
	{
		command: "rps",
		description: "pour donne une repence",
		execute: (mes) => {
			if (ok) {
				if (mes.message.substring(9) <= 3 && mes.message.substring(9)>= 0){
					if (mes.message.substring(9) == question[num].answer) {
						mes.message = "gg cest la bonne reponce ";
						if (num == 12){
							mes.message += "</br>et tu vien de finir le quiz sont faute";
						ok=false;}
						else {
							mes.message += "a la suivante:</br>";
							mes = quiz(mes, ++num);
						}
					}
					else {
						mes.message = `dsl tu tes trompe la reponce ete ${question[num].answer} `
						ok = false;
					}
				}
				else
					mes.message = "stp choisi un numeraux entre 1 et 3";

				return mes;
			}
			else
				mes.message = "ya pas de question dsl";
			return mes;
		}
	},
//cmd 4
	{
		command: "help",
		description: "affiche toute les cmd avec leur discription<fini>",
		execute: function (mes) {
			let tous = "";
			for (let i = 0; i < commands.length; i++)
				tous += `${commands[i].command} --> ${commands[i].description}</br>`;
			mes.message = tous;
			return mes;
		}
	}

];

//cette fonction cherche si la cmd exisiste
function recherche_cmd(mes, cmd) {
	for (let i = 0; i < commands.length; i++) {
		if (cmd == commands[i].command) {
			return commands[i];
		}
	}
	return false;
}
//pour lire les cmd 
//mes -->data.id + data.user
this.cmd = function (mes, text) {
	let parm = text.split(" ");
	let cmd = recherche_cmd(mes, parm[0]);
	if (cmd) {
		cmd.execute(mes);
		return mes;
	}
	else {
		mes.message="erreur";
		return mes;
	}
}
//pour aficher la question
function quiz(mes,i) {
	mes.message += question[i].question
	mes.message += question[i].n1;
	mes.message += question[i].n2;
	mes.message += question[i].n3;
	return mes;
}

