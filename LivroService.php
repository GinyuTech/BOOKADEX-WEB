<?php

    namespace src\services;

    use Exception;
    use src\models\entity\Livro;
    use src\models\repository\LivroRepository;

    class LivroService{
        private $livro;

        public function __construct()
        {
            $this->livro = new LivroRepository();
        }

        public function criar($nomeLivro,$sinopse,$autor,$dataLancamento){
            try{
                $livro = new Livro($nomeLivro,$sinopse,$autor,$dataLancamento);
                $this->livro->save($livro);

                return['success'=> 'Livro Cadastrado com Sucesso'];
            } catch(Exception $e){
                return ['error' => $e->getMessage()];
            }
        }

        public function remover($id){
            try{
                $this->livro->delete($id);
                return ['sucess' => 'Livro removido com sucesso'];
            } catch(Exception $e){
                return ['error' => $e->getMessage()];
            }
        }

        public function atualizar($id,$nomeLivro,$sinopse,$autor,$dataLancamento){
            try{
                $livro = new Livro($nomeLivro,$sinopse,$autor,$dataLancamento);
                $livro->setId($id);
                $this->livro->update($livro);

                return ['sucess' => 'Livro atualizado com sucesso'];
            } catch(Exception $e){
                return ['error' => $e->getMessage()];
            }
        }

        public function listar(){
            try{
                return $this->livro->findAll();
            } catch(Exception $e){
                return ['error' => $e->getMessage()];
            }
        }

        public function consultar($id){
            try{
                return $this->livro->findByID($id);
            }catch(Exception $e){
                return ['error' => $e->getMessage()];
            }
        }
    }
?>