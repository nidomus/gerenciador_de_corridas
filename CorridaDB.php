<?php

require_once('Conexao.php');
require_once('Corrida.php');

class CorridaDB{

    public static function salvar($c){
       
        $sql = "insert into corrida(data_corrida, distancia, tempo_corrida, ganho_elevacao) ";
        $sql .= "values (:data_corrida, :distancia, :tempo_corrida, :ganho_elevacao)";
        
        $parametros = array(
            ":data_corrida" => $c->data_corrida,
            ":distancia" => $c->distancia,
            ":tempo_corrida" => $c->tempo_corrida,
            ":ganho_elevacao" => $c->ganho_elevacao
        );

        $con = Conexao::getConexao();
        echo 'aqui';
        $comando = $con->prepare($sql);
        $comando->execute($parametros);
    }

    public static function deletar($id){
       
        $sql = "delete from corrida where id = :id";
        
        $parametros = array(
            ":id" => $id,
        );

        $con = Conexao::getConexao();
        echo 'aqui';
        $comando = $con->prepare($sql);
        $comando->execute($parametros);
    }



}