var quiz = require("./quiz/quiz.js");
this.cmd = function (data) {
	let resu;
	let msg = data.message;
	resu = data.message.split(" ");
	if (resu[0] == "salut" && resu.length == 1) {
		data.message = "salut a toi";
	}
	if (resu[0] == "video" && resu.length == 1) {
		data.message = "<video width=\"320\" margin=\"-150px\" height=\"240\" src=\"/video/video2.mp4\"controls></video>";
	}
    if(resu[0]=="language"&&resu.length==1)
		data.message="quelle language de programation";
	if(resu[0]=="language"&&resu.length>1){
		switch(resu[1]){
		case "java": data.message = "le lien est ici <a href='https://www.tutorialspoint.com/java/'>java tutorial</a> ";break;
		case "c": data.message ="le lien est ici <a href='https://www.tutorialspoint.com/cprogramming/'>c tutorial</a> ";break;
		case "c#": data.message ="le lien est ici <a href='https://www.tutorialspoint.com/csharp/'>c# tutorial</a>";break;
		case "c++": data.message ="le lien est ici <a href='https://www.tutorialspoint.com/cplusplus/'>c++ tutorial</a>";break;
		case "python": data.message ="le lien est ici <a href='http://www.tutorialspoint.com/python/'>python tutorial</a>";break;
		case "javascript": data.message = "le lien est ici < a href= 'https://www.w3schools.com/js/' > js tutorial</a >"; break;
		case "html": data.message ="le lien est ici < a href= 'https://www.w3schools.com/html/' > html tutorial</a >"; break;
		case "css": data.message = "le lien est ici < a href= 'https://www.w3schools.com/css/' > css tutorial</a >"; break;
		case "php": data.message = "le lien est ici < a href= 'https://www.w3schools.com/php/' > php tutorial</a >"; break;
		default :data.message="erreur language non conu";
		}
	}
	//pour le quiz
	if (resu[0] == "quiz") {
		data=quiz.cmd(data, data.message.substring(5));
	}
	//pour les repence des quiz
	if (resu[0] <= 3 && resu[0] >= 0) {
		data = quiz.cmd(data, data.message.substring(5));
	}
	//verification
		if (msg != data.message)
			data.rep = true;
		return data;
	}
	//ajoute lien ver le site de igenergie + facebook
	//ajoute notre structure qui est informatique + electronique + resaux
	
	//liste des projet + les participent 
	//les memebre + leur poste 
	//les base de la programation + les base de lelectronqiue + les base du resaux
	
	
	
	
	
	
	
	
	
	