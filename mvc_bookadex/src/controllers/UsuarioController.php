<?php

    namespace src\Controllers;

    use src\services\UsuarioService;

    class UsuarioController{
        private $service;

        public function __construct()
        {
            $this->service = new UsuarioService();
        }

        public function criar(){
            try{
                $data = json_decode(file_get_contents("php://input"));
                echo json_encode(
                    $this->service->criar($data->nomeUsuario, $data->apelido, $data->email, $data->senha, $data->telefone)
                );
            }catch(\Exception $e){
                echo json_encode(['error' => $e->getMessage()]);
            }
        }

        public function remover($id){
            try{
                echo json_encode($this->service->remover($id));
            }catch(\Exception $e){
                echo json_encode(['error' => $e->getMessage()]);
            }
        }

        public function atualizar($id){
            try{
                $data = json_decode(file_get_contents("php://input"));
                echo json_encode($this->service->atualizar($id, $data->nomeUsuario, $data->apelido, $data->email, 
                                $data->senha, $data->telefone));
            }catch(\Exception $e){
                echo json_encode(['error' => $e->getMessage()]);
            }
        }

        public function listar(){
            try{
                echo json_encode($this->service->listar());
            }catch(\Exception $e){
                echo json_encode(['error' => $e->getMessage()]);
            }
        }

        public function consultar($id){
            try{
                echo json_encode($this->service->consultar($id));
            }catch(\Exception $e){
                echo json_encode(['error' => $e->getMessage()]);
            }
        }

        public function mostrarFormulario(){
            include_once __DIR__.'/../../public/views/usuario/form.php';
        }

        public function hello(){
            echo 'Olá PHP';
        }

    }

?>