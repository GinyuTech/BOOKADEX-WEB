<?php

    namespace src\services;
    
    use Exception;
    use src\models\entity\Usuario;
    use src\models\repository\UsuarioRepository;

    class UsuarioService{
        private $usuario;

        public function __construct()
        {
            $this->usuario = new UsuarioRepository;
        }

        public function criar($nomeUsuario,$apelido,$email,$senha,$telefone){
            try{
                $usuario = new Usuario($nomeUsuario,$apelido,$email,$senha,$telefone);
                $this->usuario->save($usuario);

                return['success'=> 'Usuario Criado com Sucesso'];
            } catch(Exception $e){
                return ['error' => $e->getMessage()];
            }
        }

        public function remover($id){
            try{
                $this->usuario->delete($id);
                return ['sucess' => 'Usuario removido com sucesso'];
            } catch(Exception $e){
                return ['error' => $e->getMessage()];
            }
        }

        public function atualizar($id,$nomeUsuario,$apelido,$email,$senha,$telefone){
            try{
                $usuario = new Usuario($nomeUsuario,$apelido,$email,$senha,$telefone);
                $usuario->setId($id);
                $this->usuario->update($usuario);

                return ['sucess' => 'Usuario atualizado com sucesso'];
            } catch(Exception $e){
                return ['error' => $e->getMessage()];
            }
        }

        public function listar(){
            try{
                return $this->usuario->findAll();
            } catch(Exception $e){
                return ['error' => $e->getMessage()];
            }
        }

        public function consultar($id){
            try{
                return $this->usuario->findByID($id);
            }catch(Exception $e){
                return ['error' => $e->getMessage()];
            }
        }
    }

?>