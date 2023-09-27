// localStorage.removeItem('corridas');
let c = localStorage.getItem('corridas');
if (c == null) {
    document.getElementById('tabela').style.display = 'none';
} else {

    tabela = document.getElementById('corpo');
    corridas = JSON.parse(c);
    corridas.forEach(function (run) {
        console.log(run)
        linha = document.createElement('tr');

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

        linha.appendChild(tdData);
        linha.appendChild(tdDistancia);
        linha.appendChild(tdTempo);
        linha.appendChild(tdGanho);
        tabela.appendChild(linha);
    });
}

function salvarCorrida(){

    console.log('aqui')

    const data = document.getElementById('input-data')
    const distancia = document.getElementById('input2-distancia')
    const horas = document.getElementById('horas')
    const minutos = document.getElementById('minutos')
    const segundos = document.getElementById('segundos')
    const elevacao = document.getElementById('input-ganho')


    const tempo = horas.value + ":" + minutos.value + ":" + segundos.value

    corrida = {"data" : data.value, "distancia":distancia.value,"tempo":tempo,"ganho":elevacao.value}

    console.log(corrida)

    adicionarCorrida(corrida)

    data.value = distancia.value = horas.value = minutos.value = segundos.value = elevacao.values = ''

    

};

function adicionarCorrida(corrida){

    corridas = localStorage.getItem('corridas');
	if(corridas == null){
        corridas = [];
    }else{
        corridas = JSON.parse(corridas);
    }
    corridas[corridas.length] = corrida;
    localStorage.setItem('corridas', JSON.stringify(corridas));
  
    alert('Corrida cadastrada!');

}