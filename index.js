let chart1;
let chart2;

let qtdCorridas;
let kmTotal;
let kmMedio;
let tempoTotal;
let maiorTempoSeg;
let maiorTempo;
let maiorDistancia;
let maiorVelocidade;
let sumVelocidade;
let velocidadeMedia;

let vetorCorridas = [];

consulta = new XMLHttpRequest();

consulta.onload = function () {
    console.log(this.responseText);
    vetorCorridas = JSON.parse(this.responseText);
    console.log(vetorCorridas)
    gerarDados()
    preencherInfos()
};

consulta.open("GET", "get_corridas.php");

consulta.send();


function gerarDados() {

    const mes = document.getElementById('select-mes').value
    const c = localStorage.getItem('corridas');
    var corridas = JSON.parse(c)

    console.log(vetorCorridas)

    var data = []
    var data2 = []
    var label = []

    qtdCorridas = 0
    kmTotal = 0
    kmMedio = 0
    tempoTotal = 0
    maiorTempo = ''
    maiorDistancia = ''
    maiorVelocidade = 0
    sumVelocidade = 0
    velocidadeMedia = 0
    maiorDistancia = 0
    maiorTempoSeg = 0

    vetorCorridas.forEach(corrida => {
        console.log(typeof parseFloat(corrida.distancia))

        const time = Date()

        if (corrida.data_corrida.split("-")[1] === mes) {
            label.push(new Date(corrida.data_corrida + "T00:00:00").toLocaleDateString('pt-BR'))
            data.push(corrida.distancia)

            if (corrida.distancia > maiorDistancia) {
                maiorDistancia = corrida.distancia
            }

            var tempoSeg = converterTempoParaSegundos(corrida.tempo_corrida)

            tempoTotal += tempoSeg

            if (tempoSeg >= maiorTempoSeg) {
                maiorTempo = corrida.tempo_corrida
                console.log(maiorTempo)
            }



            let tempoMin = tempoSeg / 60
            let pace = tempoMin / corrida.distancia

            data2.push(parseFloat(pace))

            var velocidade = corrida.distancia * 1000 / tempoSeg

            if (velocidade > maiorVelocidade) {
                maiorVelocidade = velocidade
            }
            sumVelocidade += velocidade
            console.log(velocidade)

            kmTotal += parseFloat(corrida.distancia)
            qtdCorridas++
        }


    });


    kmMedio = kmTotal / qtdCorridas
    velocidadeMedia = sumVelocidade / qtdCorridas



    const grafico1 = { label: label, data: data }
    const grafico2 = { label: label, data: data2 }


    localStorage.setItem('grafico1', JSON.stringify(grafico1))
    localStorage.setItem('grafico2', JSON.stringify(grafico2))

    const el = document.getElementById('dash');
    const msg = document.getElementById('mensagem-dash')

    if (qtdCorridas === 0) {
        msg.style.display = 'block'
        el.style.filter = 'blur(5px)'

    } else {

        msg.style.display = 'none'
        el.style.filter = 'blur(0px)'

    }

    rendereizarGrafico1()
    rendereizarGrafico2()
    preencherInfos()
}


function converterTempoParaSegundos(tempo) {

    console.log(tempo)
    const tempoDividido = tempo.split(':')
    console.log('->' + tempoDividido)

    const hora = parseInt(tempoDividido[0]) * 3600
    const minutos = parseInt(tempoDividido[1]) * 60
    const segundos = parseInt(tempoDividido[2])

    return hora + minutos + segundos


}

function converterSegundoParaTempo(segundos) {

    let aux = segundos
    let hr = (aux / 3600).toFixed(0)
    hr = hr < 10 ? '0' + hr : hr

    aux = aux % 3600

    let min = (aux / 60).toFixed(0)

    min = min < 10 ? '0' + min : min

    let seg = aux % 60

    seg = seg < 10 ? '0' + seg : seg

    return hr + ":" + min + ":" + seg

}

function rendereizarGrafico2() {
    const ctx = document.getElementById('myChart2');

    var grafico2 = localStorage.getItem('grafico2')
    console.log(grafico2)
    grafico2 = JSON.parse(grafico2)

    const data = grafico2.data
    const label = grafico2.label

    console.log(data)

    try {
        chart2.destroy()
    } catch (error) {
        console.log('erro aqui')
    }

    chart2 = new window.Chart(ctx, {
        type: 'line',
        data: {
            labels: label,
            datasets: [{
                label: 'Pace',
                data: data,
                borderWidth: 3,
                backgroundColor: "rgb(132, 189, 0, 0.4)",
                borderColor: "#84bd00"
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Pace Médio por corrida"
                }
            }
            ,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function rendereizarGrafico1() {
    const ctx = document.getElementById('myChart1');

    var grafico1 = localStorage.getItem('grafico1')
    console.log(grafico1)
    grafico1 = JSON.parse(grafico1)

    const data = grafico1.data
    const label = grafico1.label

    console.log(label)
    console.log(data)

    try {
        chart1.destroy()
    } catch (error) {
        console.log('4')
    }

    chart1 = new window.Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: 'Km',
                data: data,
                borderWidth: 3,
                backgroundColor: "rgb(132, 189, 0, 0.4)",
                borderColor: "#84bd00"
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Km por Corrida"
                }
            }
            ,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function preencherInfos() {

    document.getElementById('info-corridas').innerHTML = qtdCorridas
    document.getElementById('info-kmTotal').innerHTML = kmTotal
    document.getElementById('info-kmMedio').innerHTML = isNaN(kmMedio) ? '0.0' : kmMedio.toFixed(2)
    document.getElementById('info-maiorKm').innerHTML = maiorDistancia
    document.getElementById('info-maiorTempo').innerHTML = maiorTempo ? maiorTempo : '-'
    document.getElementById('info-maiorVelocidade').innerHTML = maiorVelocidade.toFixed(1)
    document.getElementById('info-tempoTotal').innerHTML = converterSegundoParaTempo(tempoTotal)
    document.getElementById('info-velocidadeMedia').innerHTML = isNaN(velocidadeMedia) ? '0.0' : velocidadeMedia.toFixed(1)









}