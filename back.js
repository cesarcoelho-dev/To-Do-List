const chk = document.getElementById('checkbox');

chk.addEventListener('change', () => {
    document.body.classList.toggle('dark')
});

const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-task')

let minhaLista = [];

function addTarefa() {
    
    if(input.value && input.value.match(/[aA1-zZ0]/i)){
        minhaLista.push({
            tarefa: input.value,
            concluida: false
        })
    }

    input.value = ''

    mostrarTarefas()
}

function mostrarTarefas() {

    let novaLi = ''

    minhaLista.forEach((item, posicao) => {

        novaLi = novaLi + `
        <li class="task ${item.concluida && "done"}">
            <img src="./img/check.svg" alt="check-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/garbage.svg" alt="lixeira" onclick="deletarItem(${posicao})">
        </li>
        `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaLista))

}

function concluirTarefa(posicao){
    minhaLista[posicao].concluida = !minhaLista[posicao].concluida

    mostrarTarefas()
}

function deletarItem(posicao){
    minhaLista.splice(posicao, 1)
    
    mostrarTarefas()
}

    function recarregarTarefas(){
        const tarefasLocalStorage = localStorage.getItem('lista');

        if(tarefasLocalStorage){
            minhaLista = JSON.parse(tarefasLocalStorage)
        }

        mostrarTarefas()
    }

    recarregarTarefas()
    button.addEventListener('click', addTarefa);