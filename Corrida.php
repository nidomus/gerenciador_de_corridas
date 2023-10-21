<?php

class Corrida{

    public $id;
    public $data_corrida;
    public $distancia;
    public $tempo_corrida;
    public $ganho_elevacao;

    public function __toString(){
        return json_encode($this);
    }

}



?>