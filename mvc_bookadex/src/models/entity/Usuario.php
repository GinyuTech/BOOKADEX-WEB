<?php

    namespace src\models\entity;

    class Usuario{
        private $id;
        private $nomeUsuario;
        private $apelido;
        private $email;
        private $senha;
        private $telefone;

        public function __construct($nomeUsuario,$apelido,$email,$senha,$telefone)
        {
            $this-> nomeUsuario = $nomeUsuario;
            $this-> apelido = $apelido;
            $this-> email = $email;
            $this-> senha = $senha;
            $this-> telefone = $telefone;
        }

        public function setId($id){
            $this-> id = $id;
        }

        public function getId(){
            return $this-> id;
        }

        public function setNome($nomeUsuario){
            $this-> nomeUsuario = $nomeUsuario;
        }

        public function getNome(){
            return $this-> nomeUsuario;
        }

        public function setApelido($apelido){
            $this-> apelido = $apelido;
        }

        public function getApelido(){
            return $this-> apelido;
        }

        public function setEmail($email){
            $this-> email = $email;
        }

        public function getEmail(){
            return $this-> email;
        }
        public function setSenha($senha){
            $this-> senha = $senha;
        }

        public function getSenha(){
            return $this-> senha;
        }
        public function setTelefone($telefone){
            $this-> telefone = $telefone;
        }

        public function getTelefone(){
            return $this-> telefone;
        }       
    }
?>