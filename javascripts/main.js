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
			document.getElementById("outras-disciplinas").style.display = "none";
			break;
		case 2:
			document.getElementById("tutoria").style.display = "none";
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