var tempoInicial = $("#timer").text();
var campo = $(".campo-digitacao");

$(document).ready(function () {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaTimer();
  inicializaMarcadores();
  $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTempoInicial(tempo) {
  tempoInicial = tempo;
  $('#timer').text(tempo);
  
}

function atualizaTamanhoFrase() {
  var frase = $(".frase").text(); // $ = atalho para jQuery .text() sem parametros 'pega' as palavras
  var numPalavras = frase.split(" ").length;
  $("#tamanho-frase").text(numPalavras); // .text() com parametro insere o numPalavras
}

function inicializaContadores() {
  campo.on("input", function () {
    var conteudo = campo.val();
    var palavras = conteudo.split(/\S+/).length - 1; // /\S+/ expressão regular que busca espaço vazio/-1 para tirar o primeiro clique
    $("#contador-palavras").text(palavras);

    var caracteres = conteudo.length;
    $("#contador-caracteres").text(caracteres);
  });
}

function inicializaTimer() {
  var tempo = $("#timer").text();
  campo.one("focus", function () {
    // função one funciona como o on mas apenas 1x, não fica escutando indefinidamente
    $("#botao-reiniciar").attr("disabled", true);
    var cronometroID = setInterval(function () {
      tempo--;
      $("#timer").text(tempo);
      if (tempo < 1) {
        clearInterval(cronometroID);
        finalizaJogo();
      }
    }, 1000);
  });
}

function inicializaMarcadores() {
  var frase = $(".frase").text();
  campo.on("input", function () {
    var digitado = campo.val();
    var comparavel = frase.substr(0, digitado.length);
    if (digitado == comparavel) {
      campo.addClass("campo-certo");
      campo.removeClass("campo-errado");
    } else {
      campo.addClass("campo-errado");
      campo.removeClass("campo-certo");
    }
  });
}

function finalizaJogo() {
  campo.attr("disabled", true);
  campo.toggleClass("campo-desativado"); // toggleClass adiciona/remove classe
  $("botao-reiniciar").attr("disabled", false);
  inserePlacar();
}

function reiniciaJogo() {
  campo.attr("disabled", false);
  campo.val("");
  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#timer").text(tempoInicial);
  inicializaTimer();
  campo.toggleClass("campo-desativado");
  campo.removeClass("campo-certo");
  campo.removeClass("campo-errado");
}


