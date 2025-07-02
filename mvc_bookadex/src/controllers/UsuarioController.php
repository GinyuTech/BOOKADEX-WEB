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

        public function autenticar() {
            header('Content-Type: application/json');

            try {
                $json_data = file_get_contents("php://input");
                $dados = json_decode($json_data, true);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    http_response_code(400); // Bad Request
                    echo json_encode(['mensagem' => 'Erro: Corpo da requisição JSON inválido.']);
                    return;
                }

                $identificador = $dados['identificador'] ?? null;
                $senha = $dados['senha'] ?? null;

                if (empty($identificador) || empty($senha)) {
                    http_response_code(400); // Bad Request
                    echo json_encode(['mensagem' => 'Erro: Identificador (email/apelido) e senha são obrigatórios.']);
                    return;
                }

                // Chamar o serviço de autenticação
                $usuarioAutenticado = $this->service->autenticar($identificador, $senha);

                if ($usuarioAutenticado) {
                    http_response_code(200); // OK
                    echo json_encode([
                        'mensagem' => 'Login bem-sucedido!',
                        'usuario' => $usuarioAutenticado
                    ]);
                } else {
                    http_response_code(401); // Unauthorized
                    echo json_encode(['mensagem' => 'Erro: Usuário ou senha inválidos.']);
                }

            } catch (\Exception $e) {
                http_response_code(500); // Internal Server Error
                echo json_encode(['mensagem' => 'Erro interno do servidor: ' . $e->getMessage()]);
            }
        }

        public function hello(){
            echo 'Olá PHP';
        }

    }

?>