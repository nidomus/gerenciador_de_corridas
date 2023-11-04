<?php

//Classe utilizada para realizar conexão com o banco de dados

class Conexao{

    // Função static que conecta com o banco de dados
    public static function getConexao(){

        $host = 'localhost';
        $banco = "ifrun";
        $usuario = 'root';
        $senha = "";
        $url = "mysql:host=$host;dbname=$banco";

        return new PDO($url, $usuario, $senha);

    }


}