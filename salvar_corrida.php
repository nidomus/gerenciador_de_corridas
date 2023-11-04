<?php
require_once('CorridaDB.php');
$c = new Corrida();
$c->data_corrida = $_REQUEST['data'];
$c->distancia = $_REQUEST['distancia'];
$c->tempo_corrida = "{$_REQUEST['horas']}:{$_REQUEST['minutos']}:{$_REQUEST['segundos']}";
$c->ganho_elevacao = $_REQUEST['ganhoElevacao'];

// echo $c->__toString();
// echo  "{$_REQUEST['horas']}:{$_REQUEST['minutos']}:{$_REQUEST['segundos']}";
CorridaDB::salvar($c);
?>