<?php

namespace src\models\entity;

class Livro
{
    private $id;
    private $nomeLivro;
    private $sinopse;
    private $autor;
    private $dataLancamento;

    public function __construct($nomeLivro, $sinopse, $autor, $dataLancamento)
    {
        $this->nomeLivro = $nomeLivro;
        $this->sinopse = $sinopse;
        $this->autor = $autor;
        $this->dataLancamento = $dataLancamento;
    }

    public function setId($id){
        $this-> id = $id;
    }

    public function getId(){
        return $this-> id;
    }

    public function setNome($nomeLivro) {
        $this-> nomeLivro = $nomeLivro;
    }

    public function getNome(){
        return $this-> nomeLivro;
    }

    public function setSinopse($sinopse){
        $this-> sinopse = $sinopse;
    }

    public function getSinopse(){
        return $this-> sinopse;
    }

    public function setAutor($autor){
        $this-> autor = $autor;
    }

    public function getAutor(){
        return $this-> autor;
    }

    public function setData($dataLancamento){
        $this-> dataLancamento = $dataLancamento;
    }

    public function getData(){
        return $this-> dataLancamento;        
    }
}
