<?php
/*
* cabeçalho indicando para que o retorno será um
* arquivo no formato JSON
*/ 
ini_set('display_errors', 1);
header("Content-type: application/json; charset=utf-8");

//importando classe Contato
require_once("Corrida.php");

//conexao com banco de dados
$url="mysql:host=localhost;dbname=ifrun";
$usuario = "root";
$senha = "";
$cor = new PDO($url,$usuario,$senha);

//busca de dados
$sql = "SELECT * FROM corrida";

$resultado = $cor->query($sql);

$corridas = $resultado->fetchAll($fetchmode=PDO::FETCH_CLASS, 
    $class="Corrida");

echo json_encode($corridas);
?>