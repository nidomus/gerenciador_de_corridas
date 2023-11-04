// localStorage.removeItem('corridas');

function salvarCorrida(formulario) {

    console.log('aqui')

    // const data = document.getElementById('input-data')
    // const distancia = document.getElementById('input2-distancia')
    // const horas = document.getElementById('horas')
    // const minutos = document.getElementById('minutos')
    // const segundos = document.getElementById('segundos')
    // const elevacao = document.getElementById('input-ganho')


    // const tempo = horas.value + ":" + minutos.value + ":" + segundos.value
    // var tempo = new Date()

    // tempo.setHours(horas.value)
    // tempo.setMinutes(minutos.value)
    // tempo.setSeconds(segundos.value)

    // alert(tempo.toLocaleTimeString('pt-br'))



    // corrida = { "data": data.value, "distancia": distancia.value, "tempo": tempo.toLocaleTimeString('pt-br'), "ganho": elevacao.value }

    // console.log(corrida)

    // adicionarCorrida(corrida)

    // data.value = distancia.value = horas.value = minutos.value = segundos.value = elevacao.values = ''

    xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log(this.responseText);
    };
    xhttp.open("POST", "salvar_corrida.php", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    dados = new FormData(formulario)

    xhttp.send(new URLSearchParams(dados).toString());

    alert('Corrida adicionada com sucesso!')

    return false;

};

function adicionarCorrida(corrida) {
    corridas = localStorage.getItem('corridas');
    if (corridas == null) {
        corridas = [];
    } else {
        corridas = JSON.parse(corridas);
    }
    corridas[corridas.length] = corrida;
    localStorage.setItem('corridas', JSON.stringify(corridas));

    alert('Corrida cadastrada!');

}