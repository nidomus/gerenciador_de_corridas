
localStorage.removeItem('corridasFiltradas')

let vetorCorridas = [];
let corridasFiltradas = [];
let filtro = false;

consulta = new XMLHttpRequest();

consulta.onload = function () {
    // console.log(this.responseText);
    vetorCorridas = JSON.parse(this.responseText);
    // console.log(vetorCorridas)
    renderizarCorridas()
};

consulta.open("GET", "get_corridas.php");

consulta.send();



function renderizarCorridas() {

    limparTabela()

    if (vetorCorridas == null) {
        document.getElementById('tabela').style.display = 'none';
    } else {
        document.getElementById('mensagem').style.display = 'none';
        tabela = document.getElementById('corpo');

        var corridas;

        console.log('filtro ->', filtro)
        if (filtro === false) {

            corridas = vetorCorridas
        }
        else {
            console.log('aqui')
            console.log(corridasFiltradas)
            corridas = corridasFiltradas
            console.log(corridas)
        }

        if (corridas.length === 0) {
            document.getElementById('msg-corridas').style.display = 'block'
        } else {
            document.getElementById('msg-corridas').style.display = 'none'


            corridas.forEach(function (run) {
                // console.log(run)
                linha = document.createElement('tr');
                linha.className = 'linha'

                tdData = document.createElement('td');
                noData = document.createTextNode(new Date(run.data_corrida + "T00:00:00").toLocaleDateString('pt-BR'));
                tdData.appendChild(noData);

                tdDistancia = document.createElement('td');
                noDistancia = document.createTextNode(run.distancia + " km");
                tdDistancia.appendChild(noDistancia);

                tdTempo = document.createElement('td');
                noTempo = document.createTextNode(run.tempo_corrida);
                tdTempo.appendChild(noTempo);

                tdGanho = document.createElement('td');
                noGanho = document.createTextNode(run.ganho_elevacao + " m");
                tdGanho.appendChild(noGanho);

                tdDelete = document.createElement('td');
                btnDelete = document.createElement('button')
                noDelete = document.createElement('span')
                noDelete.className = "mdi mdi-trash-can icon"
                btnDelete.appendChild(noDelete)
                btnDelete.addEventListener('click', function () { alert('teste') })
                tdDelete.appendChild(btnDelete)

                linha.appendChild(tdData);
                linha.appendChild(tdDistancia);
                linha.appendChild(tdTempo);
                linha.appendChild(tdGanho);
                linha.appendChild(tdDelete);
                tabela.appendChild(linha);
            });
        }
    }
}

function limparTabela() {

    var linhas = document.querySelectorAll('.linha')

    // console.log(linhas)

    linhas.forEach(linha => {

        linha.remove()

    })

}

function adicionaFiltro(event) {

    var mes = document.getElementById('filtro-mes').value
    var operador = document.getElementById('filtro-operador').value
    var distancia = document.getElementById('filtro-distancia').value


    var operadores = {

        ">": function (a, b) { return Number(a) > Number(b) },
        "<": function (a, b) { return Number(a) < Number(b) },
        "===": function (a, b) { return a === b }
    }

    // console.log(Number('12.05') > Number('10'))



    // console.log("Mês:", mes, "\nOperador:", operador, "\nDistância: ", distancia)

    corridasFiltradas = []

    if (mes === '-1' && distancia === '') {

        filtro = false

    } else {

        if (distancia === '') {

            vetorCorridas.forEach(corrida => {

                if (corrida.data_corrida.split("-")[1] === mes) {
                    corridasFiltradas[corridasFiltradas.length] = corrida
                }

            })
        } else if (mes === '-1') {

            vetorCorridas.forEach(corrida => {
                console.log(corrida.distancia, " ", operador, " ", distancia, ' ', operadores[operador](corrida.distancia, distancia))
                if (operadores[operador](corrida.distancia, distancia)) {
                    corridasFiltradas[corridasFiltradas.length] = corrida
                }

            })

        } else {
            vetorCorridas.forEach(corrida => {
                if (operadores[operador](corrida.distancia, distancia) && corrida.data_corrida.split("-")[1] === mes) {
                    corridasFiltradas[corridasFiltradas.length] = corrida
                }

            })


        }


        filtro = true
    }
    renderizarCorridas()




}




