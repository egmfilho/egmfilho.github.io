var _disciplina = 0;
var _modal;
var _modalTextElem;

(function() {
	_modal = new bootstrap.Modal(document.getElementById("modal-aviso"), {});
	_modalTextElem = document.querySelector("#modal-aviso p");
	_modalTextElem.textContent = "So simple!";
})();

function onDisciplinaChange(elem) {
	_disciplina = parseInt(elem.value);

	switch (_disciplina) {
		case 1:
			document.getElementById("tutoria").style.display = "block";
			document.getElementById("TBL").style.display = "none";
			document.getElementById("outras-disciplinas").style.display = "none";
			break;
		case 2:
			document.getElementById("tutoria").style.display = "none";
			document.getElementById("TBL").style.display = "block";
			document.getElementById("outras-disciplinas").style.display = "none";
			break;
		case 3:
			document.getElementById("tutoria").style.display = "none";
			document.getElementById("TBL").style.display = "none";
			document.getElementById("outras-disciplinas").style.display = "block";
			break;
		default:
			alert("Selecione uma disciplina!");
			return;
	}
}

function Calculate() {
	switch (_disciplina) {
		case 1:
			CalculateTutoria();
			break;
		case 2:
			CalculateTBL();
			break;
		case 3:
			CalculateOthers();
			break;
		default:
			alert("Selecione uma disciplina!");
			return;
	}
}

function CalculateTutoria() {
	var participacao1 = document.querySelector("#tutoria #participacao1").value;
	var avacog1 = document.querySelector("#tutoria #avacog1").value;
	var qst1 = document.querySelector("#tutoria #qst1").value;
	var participacao2 = document.querySelector("#tutoria #participacao2").value;
	var avacog2 = document.querySelector("#tutoria #avacog2").value;
	var qst2 = document.querySelector("#tutoria #qst2").value;
	
	var media1 = (participacao1 * .25) + (avacog1 * .25) + (qst1 * .5);
	var media2 = (participacao2 * .25) + (avacog2 * .25) + (qst2 * .5);
	var result = (media1 + media2) / 2;

	showResult(media1, media2, result);
}

function SplitGrades(grades) {
	console.log('Splitting numbers: ' + grades);
	try {
		var array = grades.split(';').map(n => parseFloat(n)).filter(n => !isNaN(n));
		var sum = 0;
		array.forEach(s => sum += s);
		return sum / array.length;
	} catch { 
		return 'erro';
	}
}

function UpdateMediaTGP(modulo) {
	UpdateMedia('#TGPs' + modulo, '#mediaTGP' + modulo);
}

function UpdateMediaTCA(modulo) {
	UpdateMedia('#TCAs' + modulo, '#mediaTCA' + modulo);
}

function UpdateMedia(gradesQuery, labelQuery) { 
	var media = SplitGrades(document.querySelector(gradesQuery).value);
	document.querySelector(labelQuery).innerHTML = media.toFixed(2);
}

function CalculateTBL() {
	console.log('Calculating TBL');
	var app1 = document.querySelector("#TBL #app1").value; 
	var mediaTGP1 = parseFloat(document.querySelector("#TBL #mediaTGP1").innerHTML); 
	var mediaTCA1 = parseFloat(document.querySelector("#TBL #mediaTCA1").innerHTML); 
	var qst1 = document.querySelector("#TBL #qst1").value;
	var media1 = (app1 * .1) + (mediaTGP1 * .1) + (mediaTCA1 * .3) + (qst1 * .5);
	console.log(app1, mediaTGP1, mediaTCA1, qst1);
	console.log('Media1: ' + media1);

	var app2 = document.querySelector("#TBL #app2").value; 
	var mediaTGP2 = parseFloat(document.querySelector("#TBL #mediaTGP2").innerHTML); 
	var mediaTCA2 = parseFloat(document.querySelector("#TBL #mediaTCA2").innerHTML); 
	var qst2 = document.querySelector("#TBL #qst2").value;
	var media2 = (app2 * .1) + (mediaTGP2 * .1) + (mediaTCA2 * .3) + (qst2 * .5);
	console.log('Media2: ' + media2);

	showResult(media1, media2, (media1 + media2) / 2);
}

function CalculateOthers() {
	var av1 = document.querySelector("#outras-disciplinas #av1").value;
	var qst1 = document.querySelector("#outras-disciplinas #qst1").value;
	var qst2 = document.querySelector("#outras-disciplinas #qst2").value;
	var av2 = document.querySelector("#outras-disciplinas #av2").value;
	
	var media1 = (av1 * .5) + (qst1 * .5);
	var media2 = (av2 * .5) + (qst2 * .5);
	var result = (media1 + media2) / 2;

	showResult(media1, media2, result);
}

function showResult(media1, media2, result) {
	var t = `<b>AV1:</b> <span style="color: ${media1 >= 6 ? 'green' : 'red'}"> ${media1} </span><br>
			<b>AV2:</b> <span style="color: ${media2 >= 6 ? 'green' : 'red'}"> ${media2} </span><br>
			<b>Média Final:</b> <span style="color: ${result >= 6 ? 'green' : 'red'}"> ${result} </span>`;
	
	showModal(t);
}

function showModal(text) {
	_modalTextElem.innerHTML = text;
	_modal.show();
}