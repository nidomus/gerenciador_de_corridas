
localStorage.removeItem('corridasFiltradas')
renderizarCorridas()


function renderizarCorridas() {

    let c = localStorage.getItem('corridas');

    var cf = localStorage.getItem('corridasFiltradas')


    console.log(cf)
    limparTabela()

    if (c == null) {
        document.getElementById('tabela').style.display = 'none';
    } else {
        document.getElementById('mensagem').style.display = 'none';
        tabela = document.getElementById('corpo');

        if (cf !== null) {

            corridas = JSON.parse(cf);
        }
        else {
            corridas = JSON.parse(c)
        }

        corridas.forEach(function (run) {
            console.log(run)
            linha = document.createElement('tr');
            linha.className = 'linha'

            tdData = document.createElement('td');
            noData = document.createTextNode(run.data);
            tdData.appendChild(noData);

            tdDistancia = document.createElement('td');
            noDistancia = document.createTextNode(run.distancia);
            tdDistancia.appendChild(noDistancia);

            tdTempo = document.createElement('td');
            noTempo = document.createTextNode(run.tempo);
            tdTempo.appendChild(noTempo);

            tdGanho = document.createElement('td');
            noGanho = document.createTextNode(run.ganho);
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

function limparTabela() {

    var linhas = document.querySelectorAll('.linha')

    console.log(linhas)

    linhas.forEach(linha => {

        linha.remove()

    })

}

function adicionaFiltro(event) {

    var filtro = document.getElementById('filtro-mes')
    var operador = document.getElementById('filtro-operador').value
    var distancia = document.getElementById('filtro-distancia').value

    var mes = filtro.value

    var operadores = {

        ">": function (a, b) { return Number(a) > Number(b) },
        "<": function (a, b) { return Number(a) < Number(b) },
        "===": function (a, b) { return a === b }
    }

    console.log(Number('12.05') > Number('10'))

    var corridas = localStorage.getItem("corridas")
    corridas = JSON.parse(corridas)

    console.log("Mês:", mes, "\nOperador:", operador, "\nDistância: ", distancia)


    var corridasFiltradas = []

    if (mes === '-1' && distancia === '') {
        console.log('aqui')
        localStorage.removeItem('corridasFiltradas')

    } else {

        if (distancia === '') {

            corridas.forEach(corrida => {

                if (corrida.data.split("-")[1] === mes) {
                    corridasFiltradas[corridasFiltradas.length] = corrida
                }

            })
        } else if (mes === '-1') {

            corridas.forEach(corrida => {
                console.log(corrida.distancia, " ", operador, " ", distancia, ' ', operadores[operador](corrida.distancia, distancia))
                if (operadores[operador](corrida.distancia, distancia)) {
                    corridasFiltradas[corridasFiltradas.length] = corrida
                }

            })

        } else {
            corridas.forEach(corrida => {
                if (operadores[operador](corrida.distancia, distancia) && corrida.data.split("-")[1] === mes) {
                    corridasFiltradas[corridasFiltradas.length] = corrida
                }

            })


        }

        localStorage.setItem('corridasFiltradas', JSON.stringify(corridasFiltradas))

    }
    renderizarCorridas()




}




