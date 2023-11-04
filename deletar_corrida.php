<?php
require_once('CorridaDB.php');


$id = $_REQUEST['id'];

// echo $c->__toString();
// echo  "{$_REQUEST['horas']}:{$_REQUEST['minutos']}:{$_REQUEST['segundos']}";
CorridaDB::deletar($id);
?>