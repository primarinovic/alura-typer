$('#botao-placar').click(mostraPlacar);

function novaLinha(usuario, numPalavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>")
      .addClass("small")
      .addClass("material-icons")
      .text("delete");
  
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
  
    return linha;
  }
  
  function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Novo Usuário";
    var numPalavras = $("#contador-palavras").text();
  
    var linha = novaLinha(usuario, numPalavras);
    linha.find('.botao-remover').click(removeLinha);
  
    corpoTabela.append(linha); // append add como ultimo filho, prepend adiciona no topo
    $('.placar').slideDown(1000);
    scrollPlacar();
  }

  function scrollPlacar(){

    var posicaoPlacar = $('.placar').offset().top;
    $('html').animate(        //tive que usar tag html ao inves de body, pois nao funcionava
      {
        scrollTop: posicaoPlacar+"px"
      }, 1000);
  }
  
  function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent(); 
    linha.fadeOut(1000);
    setTimeout(function(){
      linha.remove(); 
    }, 1000)
    
  }

  function mostraPlacar(){
    $('.placar').stop().slideToggle(600);
  }
  