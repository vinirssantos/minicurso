/**
 * @description Verifica se a tarefa está dentro do prazo, no dia da entrega ou atrasada
 * @author Vinicius dos Santos
 */
function verificaPrazoTarefa() {
    var el = document.getElementsByClassName("limit-date");
    for (var i = 0; i < el.length; i++) {
        if(el[i].childElementCount < 1) {
            var data = el[i].innerText.split(" ")[1].split("/");
            data = data[2] + '/' + data[1] + '/' + data[0];
            if (new Date(data) > new Date(new Date().setHours(0, 0, 0, 0))) {
                el[i].innerHTML = '<span class="nice-alert"></span>\ ' + el[i].innerHTML;
            } else if (new Date(data) < new Date(new Date().setHours(0, 0, 0, 0))) {
                el[i].innerHTML = '<span class="danger-alert"></span>\ ' + el[i].innerHTML;
            } else {
                el[i].innerHTML = '<span class="warning-alert"></span>\ ' + el[i].innerHTML;
            }
        }
    }
}

/**
 * @description Cria e adiciona tarefas nas listas
 * @param {*} lista Lista a qual a tarefa sera inserido
 * @param {*} cor Cor do box da tarefa
 * @param {*} data Data limite para a entrega da tarefa
 * @param {*} texto Texto da Tarefa
 * @author Vinicius dos Santos
 */
function adicionaElemento(lista, cor, data, texto) {
    var tarefa = document.createElement('li');
    tarefa.className = 'task '+cor;
    tarefa.innerHTML = '\
        <p>'+texto+'</p>\
        <span class="limit-date">Limite: '+data+'</span>\
        <i class="clearfix"></i>\
        <button class="pull-left delete-button" onClick="removeElemento(this)">x</button>\
        <div class="dropdown pull-right">\
            <button class="drop" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mover</button> \
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">\
                <a class="dropdown-item" href="javascript:void(0)" onClick="moveTarefa(this, \'a-fazer\')" data-list="a-fazer">À Fazer</a>\
                <a class="dropdown-item" href="javascript:void(0)" onClick="moveTarefa(this, \'trabalhando\')" data-list="trabalhando"> Trabalhando</a>\
                <a class="dropdown-item" href="javascript:void(0)" onClick="moveTarefa(this, \'parado\')" data-list="parado">Parado</a>\
                <a class="dropdown-item" href="javascript:void(0)" onClick="moveTarefa(this, \'finalizado\')" data-list="finalizado">Finalizado</a>\
            </div>\
        </div>\
    ';
    tarefa.setAttribute('onmouseover', 'onOver(this)');
    tarefa.setAttribute('onmouseout', 'onOut(this)');
    document.getElementById(lista).appendChild(tarefa);
    verificaPrazoTarefa();
}

/**
 * @description Exclui elemento específico
 * @param {*} elemento Tarefa a ser excluída
 * @author Vinicius dos Santos
 */
function removeElemento(elemento) {
    elemento.parentElement.remove();
}

/**
 * @description Torna o botão excluír visível quando evento onmouserover é disparado
 * @param {*} elemento Tarefa selecionada
 * @author Vinicius dos Santos 
 */
function onOver(elemento) {
    elemento.querySelector('.delete-button').style.display = 'inline-block';
    //elemento.childNodes[number].style.display = 'inline-block';
}

/**
 * @description Torna o botão excluír invisível quando evento onmouserout é disparado
 * @param {*} elemento Tarefa selecionada
 * @author Vinicius dos Santos 
 */
function onOut(elemento) {
    elemento.querySelector('.delete-button').style.display = 'none';
    //elemento.childNodes[number].style.display = 'none';
}

/**
 * @description Move tarefa para lista selecionada
 * @param {*} elemento Tarefa a ser movida 
 * @param {*} lista Lista a qual a tarefa sera movida
 * @author Vinicius dos Santos
 */
function moveTarefa(elemento, lista) {
    document.getElementById(lista).appendChild(elemento.parentElement.parentElement.parentElement);
    ocultaListaAtualLink()
}

function criaTarefa() {
    $('.collapse').collapse('hide');
    var tarefa = document.getElementById('tarefa-field').value;
    var data = document.getElementById('data').value;
    var cor = document.getElementsByName('cor');
    var checked=0;
    for (var i=0; i < cor.length; i++) {
        if (cor[i].checked) {
            cor = cor[i].value;
            checked = i;
        }
    }
    
    adicionaElemento('a-fazer', cor, data, tarefa);
    document.getElementById('tarefa-field').value = '';
    document.getElementById('data').value = '';
    document.getElementsByName('cor')[checked].checked = false;
}

function ocultaListaAtualLink() {
    const links = document.getElementsByClassName('dropdown-item');
    for (var i = 0; i < links.length; i++) {
        if (links[i].parentElement.parentElement.parentElement.parentElement.id == links[i].getAttribute('data-list')) {
            links[i].style.display = 'none';
        } else {
            links[i].style.display = 'block';
        }
    }
}


function mascaraData(campoData) {
    var data = campoData.value;
    if (data.length == 2) {
        data += '/';
        campoData.value = data;
    }
    if (data.length == 5) {
        data = data + '/';
        campoData.value = data;
        return true;
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}