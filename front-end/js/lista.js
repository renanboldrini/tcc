var saldo;
var contas;
var meses = ["", "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
var gastosMensais;
var gastosDiarios;
var limiteV;
var emprestimos;



$(document).ready(function () {
	getSaldo();
	getEmprestimos();
	getContas();
});


function estrelasCont(){
	var resultado;
	var estrela = parseFloat(limiteV) / 5.0;
	var disponivel = parseFloat(limiteV) - parseFloat(gastosMensais);
	if(limiteV > gastosMensais && disponivel > estrela){
			resultado = parseFloat(disponivel) / parseFloat(estrela);
			if(resultado > 4)
				return 5
			else if(resultado > 3)
				return 4	
			else if(resultado > 2)
				return 3	
			else if(resultado > 1)
				return 2
	}else{
		return 1			;
	}
}

function atualizaLimite(){
	var settings;

	if($("#limite").val() != "" && parseFloat($("#limite").val()) > 0){

	settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tcc-adonis.herokuapp.com/budget/1",
	  "method": "PUT",
	  "headers": {
	    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
	    "content-type": "application/json"
	  },
	  "processData": false,
	  "data": '{"value": '+($("#limite").val().replace('.','')).replace(',','.')+',  "status": "ativo"}'
	}

	$.ajax(settings).done(function (response) {
	getLimite();
	$("#limite").val("");
	});
	}
	

}



function indicadorContaS(){
	var estrelas = estrelasCont();
	var estrelasV = 5 - estrelas;
	var INDICARDOR = document.querySelector("#indicadorContas");
	var INDICARDORD = document.querySelector("#indicadorContasD");

	INDICARDOR.innerHTML = "";
	INDICARDORD.innerHTML = "";

	for (var i = 0; i < estrelas; i++) {
		INDICARDOR.innerHTML += '<img class="star" src="https://drive.google.com/uc?id=1N70DvstkmBUB5s2p-symt6B05uyFUl6M">     ';
		INDICARDORD.innerHTML += '<img class="star" src="https://drive.google.com/uc?id=1N70DvstkmBUB5s2p-symt6B05uyFUl6M">     ';	
	}

	for (var i = 0; i < estrelasV; i++) {
		INDICARDOR.innerHTML += '<img class="star" src="https://drive.google.com/uc?id=1132i5q1UmMs3OumrOklgOhwUBpZyXMeD">     ';
		INDICARDORD.innerHTML += '<img class="star" src="https://drive.google.com/uc?id=1132i5q1UmMs3OumrOklgOhwUBpZyXMeD">     ';	
	}
	

}

function maxMin(){
	if(document.getElementById('botaoFiltro').style.display == "block"){
		div = document.querySelector('#categoriza');  //exemplo -> #botaoP1
		trocaClasse(div, 'minimizado', 'maximizado');

		div = document.querySelector('#Tab');  //exemplo -> #botaoP1
		trocaClasse(div, 'Tminimizado', 'Tmaximizado');

		document.getElementById('botaoFiltro').style.display = "none";
		document.getElementById('alteraConta').style.display = 'none';
		document.getElementById('alteraEmprestimo').style.display = 'none';		

		document.getElementById('sel-cat').style.display = "block";
	}else{
		div = document.querySelector('#categoriza');  //exemplo -> #botaoP1
		trocaClasse(div, 'maximizado', 'minimizado');

		div = document.querySelector('#Tab');  //exemplo -> #botaoP1
		trocaClasse(div, 'Tmaximizado', 'Tminimizado');

		document.getElementById('botaoFiltro').style.display = "block";
		document.getElementById('alteraConta').style.display = 'block';
		document.getElementById('alteraEmprestimo').style.display = 'block';	

		document.getElementById('sel-cat').style.display = "none";
	}
}

function trocarClasse(elemento, antiga, nova) {
	elemento.classList.remove(antiga);
	elemento.classList.add(nova);
}
// home saldo

function getSaldo() {
	var json;
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://tcc-adonis.herokuapp.com/balance",
		"method": "GET",
		"headers": {
			"content-type": "application/json",
			"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM"
		},
		"processData": false,
		"data": ""
	}
	$.ajax(settings).done(function (response) {
		json = response;
		let SALDO = document.querySelector("#saldoC");
		let SALDOD = document.querySelector("#saldoCD");
		var valor = ""+json[0].value;
		saldo = json[0].value;

		valor = parseFloat(valor.replace(',','.'));
		valor = valor.toFixed(2);


		SALDO.innerHTML = "R$ "+valor.replace('.',',');
		SALDOD.innerHTML = "R$ "+valor.replace('.',',');
	});
}



function getLimite() {
	var mesAtual =  moment().format("MM");
	var diaAtual =  moment().format("DD");
	var json;
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://tcc-adonis.herokuapp.com/budget",
		"method": "GET",
		"headers": {
			"content-type": "application/json",
			"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM"
		},
		"processData": false,
		"data": ""
	}
	$.ajax(settings).done(function (response) {
		json = response;
		limiteV = json[0].value;

		gastosMensais = 0
		gastosDiarios = 0

		for(var c in contas){
		if(mesAtual == contas[c].date.substring(5, 7)){
			gastosMensais += contas[c].value;
			if(diaAtual == contas[c].date.substring(8, 10)){
				gastosDiarios += contas[c].value;
			}
				}
		}
		limite();

	});

}

function limite(){
		let LIMITE = document.querySelector("#limiteC");
		let LIMITED = document.querySelector("#limiteCD");
		let GASTOS = document.querySelector("#gastos");
		let GASTOSD = document.querySelector("#gastosD");

	var ultimoDia = moment().endOf('month').format('DD');
	var diaAtual = moment().format('DD');

	var diasFaltantes = ultimoDia - diaAtual + 1;

	var limiteDiario = (limiteV - gastosMensais)/diasFaltantes;

	if (limiteDiario > 0) {
		LIMITE.innerHTML = "R$ "+limiteDiario.toFixed(2).replace('.',',');
		LIMITED.innerHTML = "R$ "+limiteDiario.toFixed(2).replace('.',',');

	}else{
		LIMITE.innerHTML = "R$ 0,00";
		LIMITED.innerHTML = "R$ 0,00";
	}
		GASTOS.innerHTML = "R$ "+gastosDiarios.toFixed(2).replace('.',',');
		GASTOSD.innerHTML = "R$ "+gastosDiarios.toFixed(2).replace('.',',');

	indicadorContaS();
}
//saldo fim


// conta paga/nao paga
function situacaoConta(valor, id, status){ //ex: 30, "1" "1"  status = tru conta paga q vai virar nao paga
	document.getElementById('botaoNP'+id).style.display = "none";  
	document.getElementById('botaoP'+id).style.display = "none"; 
	document.getElementById('load'+id).style.display = "block";
	if(status){
	valor = saldo + valor;
	}else{
	valor = saldo - valor;
	}

	var json;
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://tcc-adonis.herokuapp.com/balance/1",
		"method": "PUT",
		"headers": {
			"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
			"content-type": "application/json"
		},
		"processData": false,
		"data": '{"value": '+valor+', "status": "ativo"}'
	}

	$.ajax(settings).done(function (response) {
		if(status){
			alteraStatus("false");
		}else{
			alteraStatus("true");
		}

		let SALDO = document.querySelector("#saldoC");
		let SALDOD = document.querySelector("#saldoCD");

		json = response;

		var valor = ""+json.value;
		saldo = json.value;

		valor = parseFloat(valor.replace(',','.'));
		valor = valor.toFixed(2);

		SALDO.innerHTML = "R$ "+valor.replace('.',',');
		SALDOD.innerHTML = "R$ "+valor.replace('.',',');

		document.getElementById('load'+id).style.display = "none";

		if(status){
			document.getElementById('botaoNP'+id).style.display = "block"; 
		}else{
			document.getElementById('botaoP'+id).style.display = "block"; 
		}
	});
}
//final paga/nao paga conta

function alteraStatus(status, id){  //verificar chamada
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tcc-adonis.herokuapp.com/billsToPay/"+id+"",
	  "method": "PUT",
	  "headers": {
	    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
	    "content-type": "application/json"
	  },
	  "processData": false,
	  "data": '{"status": "'+status+'"}'
	}

	$.ajax(settings).done(function (response) {
	});
}

function getContas(){ 
	var json;
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tcc-adonis.herokuapp.com/billsToPay",
	  "method": "GET",
	  "headers": {
	    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
	    "content-type": "application/json"
	  },
	  "processData": false,
	  "data": "{}"
	}

	$.ajax(settings).done(function (response) {
	  contas = response;
	  construcaoTabela(contas);
	  getLimite();
	});
}

function construcaoTabela(json){
	contas.sort(compare);
	var tabela = '<table class="tabela table-borderless"> <tbody>';
	var condicao1;
	var condicao2;

	for(var c in json){
		if(json[c].status == "false"){
			condicao1 = "block";
			condicao2 = "none";
		}else{
			condicao1 = "none";
			condicao2 = "block";
		}
		tabela += 			'<tr id="'+json[c].id+'">'+      
										'<td class="categoria-campo"><img class="categoria" src="'+retornaURLimagem(json[c].category)+'"></td>'+
										'<td><p class="categoria-text">'+json[c].category+'</p><p class="estabelecimento">'+contas[c].descripition+'</p><p class="valor">R$ '+json[c].value.toString().replace('.',',')+'</p></td>'+
										'<td class="tdmeio">'+
											'<p class="data">'+json[c].date.substr(8,2)+" "+meses[parseInt(json[c].date.substr(5,2))]+'</p>'+

											'<p class="anoT">'+json[c].date.substr(0,4)+'</p>'+											

											//pagar
											'<div id="botaoNP'+json[c].id+'" class="botaoPagar" onclick="atualizaStatusConta(true, '+json[c].id+'); situacaoConta('+json[c].value+', '+json[c].id+', false)" style="display: '+condicao1+';">'+
												'PAGAR'+
											'</div>'+

											//load
											'<div id="load'+json[c].id+'" class="botaoPago" onclick="" style="display: none;">'+
												'<img id="imgBtp'+json[c].id+'" class="loadP rodar" src="https://drive.google.com/uc?id=11I83SSSUCFsQdmPzwcB8rSuVFA_QMtnx">'+
											'</div>'+

											//pago
											'<div id="botaoP'+json[c].id+'" class="botaoPago" onclick="atualizaStatusConta(false, '+json[c].id+'); situacaoConta('+json[c].value+', '+json[c].id+', true)" style="display: '+condicao2+';">'+
												'PAGO <img id="imgBtp'+json[c].id+'" class="checkPago" src="https://drive.google.com/uc?id=1MrKymb5KBaAYsOcIyyDKR-dpaWUhA_J4">'+
											'</div>'+
										'</td>'+
										'<td>'+
										'<img id="lixo'+json[c].id+'" class="excluir" onclick="excluirConta('+json[c].id+')" style="display: inherit;" src="https://drive.google.com/uc?id=1TEf28O9v7vBs3YD9J4bqpOcl-xUIHPJG">'+
										'<img id="imgBtpt'+json[c].id+'" class="excluir rodar" style="display: none;" src="https://drive.google.com/uc?id=11I83SSSUCFsQdmPzwcB8rSuVFA_QMtnx">'+
										'</td>'+
									'</tr>' 

	}
	tabela += "</tbody></table>";

	var tab = document.querySelector("#Tab");
	tab.innerHTML = tabela;

	document.getElementById('botaoFiltro').style.display = 'block';
	document.getElementById('imagemsub').style.display = 'none';	
}

function categorizar(categoriaSel){
	var selecionadas = [];

	for(var c in contas){
		if ((contas[c].category).toLowerCase() == categoriaSel.toLowerCase() ) {
			selecionadas.push(contas[c]);
		}
	}

	construcaoTabela(selecionadas);

	maxMin();
}



function atualizaSald(valor){ //ex: 30, "1" "1"  status = tru conta paga q vai virar nao paga

	valor = saldo+(valor);
	var json;
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://tcc-adonis.herokuapp.com/balance/1",
		"method": "PUT",
		"headers": {
			"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
			"content-type": "application/json"
		},
		"processData": false,
		"data": '{"value": '+valor+', "status": "ativo"}'
	}

	$.ajax(settings).done(function (response) {
			getSaldo();
	});
}

function atualizaStatusConta(status, id){
		var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tcc-adonis.herokuapp.com/billsToPay/"+id,
	  "method": "PUT",
	  "headers": {
	    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
	    "content-type": "application/json"
	  },
	  "processData": false,
	  "data": '{"status": "'+status+'"}'
	}

	$.ajax(settings).done(function (response) {
	});
}


function atualizaStatusEmprestimo(status, id){
		var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tcc-adonis.herokuapp.com/billsToReceive/"+id,
	  "method": "PUT",
	  "headers": {
	    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
	    "content-type": "application/json"
	  },
	  "processData": false,
	  "data": '{"status": "'+status+'"}'
	}

	$.ajax(settings).done(function (response) {
	});
}




function excluirConta(id){
	document.getElementById('lixo'+id).style.display = "none";  
	document.getElementById('imgBtpt'+id).style.display = "inherit";  
	
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tcc-adonis.herokuapp.com/billsToPay/"+id,
	  "method": "DELETE",
	  "headers": {
	    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
	    "content-type": "application/json"
	  },
	  "processData": false,
	  "data": ""
	}

	$.ajax(settings).done(function (response) {
		getSaldo();
		getContas();
	});
}



















// conta paga/nao paga
function situacaoEmprestimo(valor, id, status){ //ex: 30, "1" "1"  status = tru conta paga q vai virar nao paga
	document.getElementById('botaoNPE'+id).style.display = "none";  
	document.getElementById('botaoPE'+id).style.display = "none"; 
	document.getElementById('loadE'+id).style.display = "block";
	if(status){
	valor = saldo - valor;
	}else{
	valor = saldo + valor;
	}

	var json;
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://tcc-adonis.herokuapp.com/balance/1",
		"method": "PUT",
		"headers": {
			"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
			"content-type": "application/json"
		},
		"processData": false,
		"data": '{"value": '+valor+', "status": "ativo"}'
	}

	$.ajax(settings).done(function (response) {
		if(status){
			alteraStatusEmprestimo("false");
		}else{
			alteraStatusEmprestimo("true");
		}

		let SALDO = document.querySelector("#saldoC");
		let SALDOD = document.querySelector("#saldoCD");

		json = response;

		var valor = ""+json.value;
		saldo = json.value;

		valor = parseFloat(valor.replace(',','.'));
		valor = valor.toFixed(2);

		SALDO.innerHTML = "R$ "+valor.replace('.',',');
		SALDOD.innerHTML = "R$ "+valor.replace('.',',');

		document.getElementById('loadE'+id).style.display = "none";

		if(status){
			document.getElementById('botaoNPE'+id).style.display = "block"; 
		}else{
			document.getElementById('botaoPE'+id).style.display = "block"; 
		}
	});
}
//final paga/nao paga conta

function alteraStatusEmprestimo(status, id){  //verificar chamada
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tcc-adonis.herokuapp.com/billsToReceive/"+id+"",
	  "method": "PUT",
	  "headers": {
	    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
	    "content-type": "application/json"
	  },
	  "processData": false,
	  "data": '{"status": "'+status+'"}'
	}

	$.ajax(settings).done(function (response) {
	});
}

function getEmprestimos(){ 
	var json;
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tcc-adonis.herokuapp.com/billsToReceive",
	  "method": "GET",
	  "headers": {
	    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
	    "content-type": "application/json"
	  },
	  "processData": false,
	  "data": "{}"
	}

	$.ajax(settings).done(function (response) {
	  emprestimos = response;
	});
}

function getEmprestimosdepois(){ 
	var json;
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tcc-adonis.herokuapp.com/billsToReceive",
	  "method": "GET",
	  "headers": {
	    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
	    "content-type": "application/json"
	  },
	  "processData": false,
	  "data": "{}"
	}

	$.ajax(settings).done(function (response) {
	  emprestimos = response;
	  construcaoTabelaEmprestimo(emprestimos);
	});
}

function construcaoTabelaEmprestimo(json){
	emprestimos.sort(compare);
	var tabela = '<table class="tabela table-borderless"> <tbody>';
	var condicao1;
	var condicao2;

	for(var c in json){
		if(json[c].status == "false"){
			condicao1 = "block";
			condicao2 = "none";
		}else{
			condicao1 = "none";
			condicao2 = "block";
		}
		tabela += 			'<tr id="'+json[c].id+'">'+      
										'<td class="categoria-campo"><img class="categoria" src="'+retornaURLimagem(json[c].category)+'"></td>'+
										'<td><p class="categoria-text">'+json[c].category+'</p><p class="estabelecimento">'+json[c].descripition+'</p><p class="valor">R$ '+json[c].value.toString().replace('.',',')+'</p></td>'+
										'<td class="tdmeio">'+
											'<p class="dataemprestimo">'+json[c].date.substr(8,2)+" "+meses[parseInt(json[c].date.substr(5,2))]+'</p>'+
											'<p class="anoTE">'+json[c].date.substr(0,4)+'</p>'+	

											//pagar
											'<div id="botaoNPE'+json[c].id+'" class="botaoPagar coringapago" onclick="atualizaStatusEmprestimo(true, '+json[c].id+'); situacaoEmprestimo('+json[c].value+', '+json[c].id+', false)" style="display: '+condicao1+';">'+
												'RECEBER'+
											'</div>'+

											//load
											'<div id="loadE'+json[c].id+'" class="botaoLoad" onclick="" style="display: none;">'+
												'<img id="imgBtp'+json[c].id+'" class="loadP rodar" src="https://drive.google.com/uc?id=11I83SSSUCFsQdmPzwcB8rSuVFA_QMtnx">'+
											'</div>'+

											//pago
											'<div id="botaoPE'+json[c].id+'" class="botaoPago coringapago" onclick="atualizaStatusEmprestimo(false, '+json[c].id+'); situacaoEmprestimo('+json[c].value+', '+json[c].id+', true)" style="display: '+condicao2+';">'+
												'RECEBIDO <img id="imgBtp'+json[c].id+'" class="checkPago" src="https://drive.google.com/uc?id=1MrKymb5KBaAYsOcIyyDKR-dpaWUhA_J4">'+
											'</div>'+
										'</td>'+
										'<td>'+

										'<img id="lixoE'+json[c].id+'" class="excluir" onclick="excluirEmprestimo('+json[c].id+')" style="display: inherit;" src="https://drive.google.com/uc?id=1TEf28O9v7vBs3YD9J4bqpOcl-xUIHPJG">'+
										'<img id="imgBtptE'+json[c].id+'" class="excluir rodar" style="display: none;" src="https://drive.google.com/uc?id=11I83SSSUCFsQdmPzwcB8rSuVFA_QMtnx">'+

										'</td>'+
									'</tr>' 

	}
	tabela += "</tbody></table>";

	var tab = document.querySelector("#Tab");
	tab.innerHTML = tabela;

	document.getElementById('botaoFiltro').style.display = 'none';
	document.getElementById('imagemsub').style.display = 'block';	
}



function excluirEmprestimo(id){
	document.getElementById('lixoE'+id).style.display = "none";  
	document.getElementById('imgBtptE'+id).style.display = "inherit";  
	
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tcc-adonis.herokuapp.com/billsToReceive/"+id,
	  "method": "DELETE",
	  "headers": {
	    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
	    "content-type": "application/json"
	  },
	  "processData": false,
	  "data": ""
	}

	$.ajax(settings).done(function (response) {
	getEmprestimosdepois()
	});
}





//ordenar lista

function compare(a,b) {//contas[1].date.substr(0,10)
da = new Date(a.date.substr(0,10));
db = new Date(b.date.substr(0,10));

  return da < db;
}

//imagens

function retornaURLimagem(imagem){

if(imagem == 'casa'){ return 'https://drive.google.com/uc?id=1yP36cBk4GvPugXPLJlarJgNirW_axs9t'} 

if(imagem == 'comida'){ return 'https://drive.google.com/uc?id=16WOKUkCaWKKaTwIipDJFm7WF2TFNcyhq'}

if(imagem == 'educacao'){ return 'https://drive.google.com/uc?id=1tw0zCU-p3zF5ez53ccNAtaM_Xu2_2kFW'}

if(imagem == 'eletronicos'){ return 'https://drive.google.com/uc?id=1B-kntHuNoA_VJ--2qzE2fbwpkVKL4MJR'}

if(imagem == 'emprestimo'){ return 'https://drive.google.com/uc?id=1OVYyw2fRsE4h9HU8a10PCUkTeZRLYSdS'}

if(imagem == 'lazer'){ return 'https://drive.google.com/uc?id=1z7dZ5oAU2nVEicOR_I4iTaMLoiTMW2tj'}

if(imagem == 'outros'){ return 'https://drive.google.com/uc?id=1vMNbKew1YQDUwNF5o9_krKm0a-5hu7Nl'}

if(imagem == 'restaurante'){ return 'https://drive.google.com/uc?id=1XCbWtDOTsNbcNH-b0NOkObNxgF0prAH9'}

if(imagem == 'saude'){ return 'https://drive.google.com/uc?id=1NA9ESGVtCoVf2FKY3a8edOYYPcco56AG'} 

if(imagem == 'servicos'){ return 'https://drive.google.com/uc?id=1bF-mM4WG_eYUViBpSiSIUjQjfn2Lcyo8'}	

if(imagem == 'supermercado'){ return 'https://drive.google.com/uc?id=1cf5rFrko0SHMxWt9qFhRytZ6dnacSB37'} 

if(imagem == 'transporte'){ return 'https://drive.google.com/uc?id=120b-h3N0QsEolyH-tQSIoG86PbH61bty'}	

if(imagem == 'vestuarios'){ return 'https://drive.google.com/uc?id=1eYh6Zyi42_hye9UMKv0-Jdfyxa8cfBrA'} 

if(imagem == 'viagem'){ return 'https://drive.google.com/uc?id=1WKjl0jb_DHIMKPhnB_TdQi-bIBXuGEbV'}	

}

//saldo

function atualizaSaldo(){
	var settings;

	if($("#saldoR").val() != "" && parseFloat($("#saldoR").val()) > 0){

	settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tcc-adonis.herokuapp.com/balance/1",
	  "method": "PUT",
	  "headers": {
	    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzOTczMjkyMX0.SKnlKuM_wrX9g00BlCXbPJjVroNH4-FFDf4S6C9vXZM",
	    "content-type": "application/json"
	  },
	  "processData": false,
	  "data": '{"value": '+($("#saldoR").val().replace('.','')).replace(',','.')+',  "status": "ativo"}'
	}

	$.ajax(settings).done(function (response) {
	getSaldo();
	$("#saldoR").val("");
	});
	}

}



//google

// GOOGLE ANALYTCS
function analytics(indicador){  
  switch (indicador) {
    case 1:
    ga('send','event', 'Botão', 'Clicar', 'Localizar Agência - Identificar minha localização'); 
    break;
    case 2:
    ga('send','event', 'Botão', 'Clicar', 'Localizar Agência - Pesquisar por Cooperativa: Agência e Agente Credenciado'); 
    break;
    case 3:
    ga('send','event', 'Botão', 'Clicar', 'Localizar Agência - Pesquisar por Cooperativa e Agência'); 
    break;
    case 4:
    ga('send','event', 'Botão', 'Clicar', 'Localizar Agência - Pesquisar por Cooperativa e Agente Credenciado'); 
    break;      
    case 5:
    ga('send','event', 'Botão', 'Clicar', 'Localizar Agência - Pesquisar por Cidade: Agência e Agente Credenciado'); 
    break;          
    case 6:
    ga('send','event', 'Botão', 'Clicar', 'Localizar Agência - Pesquisar por Cidade e Agência'); 
    break;      
    case 7:
    ga('send','event', 'Botão', 'Clicar', 'Localizar Agência - Pesquisar por Cidade e Agente Credenciado'); 
    break;     
    case 8:
    ga('send','event', 'Botão', 'Clicar', 'Localizar Agência - Pesquisar por CEP: Agência e Agente Credenciado'); 
    break;          
    case 9:
    ga('send','event', 'Botão', 'Clicar', 'Localizar Agência - Pesquisar por CEP e Agência'); 
    break;      
    case 10:
    ga('send','event', 'Botão', 'Clicar', 'Localizar Agência - Pesquisar por CEP e Agente Credenciado'); 
    break;          
    case 11:
    ga('send','event', 'Link', 'Clicar', 'Localizar Agência - Banco 24 horas');       
    break;            
    case 12:
    ga('send','event', 'Botão', 'Clicar', 'Localizar Agência - Visualizar Mapa'); 
    break;       
    case 13:
    ga('send','event', 'Botão', 'Clicar', 'Localizar Agência - Como chegar'); 
    break;                                                             
  }
}

//login provisorio para a aplicacao / apresentacao
function logando(){

	if($(llogin).val() === "teste@teste.com.br" && $(Slogin).val() === "123456" ){
	document.getElementById('pgLogin').style.display = 'none';
	document.getElementById('home').style.display = 'block';
	}else{

	}
}