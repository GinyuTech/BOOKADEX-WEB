<?php

namespace src\services;

use Exception;
use src\models\entity\Usuario;
use src\models\repository\UsuarioRepository;

class UsuarioService
{
    private $usuario;

    public function __construct()
    {
        $this->usuario = new UsuarioRepository;
    }

    public function criar($nomeUsuario, $apelido, $email, $senha, $telefone)
    {
        try {
            $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
            $usuario = new Usuario($nomeUsuario, $apelido, $email, $senhaHash, $telefone);
            $this->usuario->save($usuario);

            return ['success' => 'Usuario Criado com Sucesso'];
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function remover($id)
    {
        try {
            $this->usuario->delete($id);
            return ['sucess' => 'Usuario removido com sucesso'];
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function atualizar($id, $nomeUsuario, $apelido, $email, $senha, $telefone)
    {
        try {
            $usuario = new Usuario($nomeUsuario, $apelido, $email, $senha, $telefone);
            $usuario->setId($id);
            $this->usuario->update($usuario);

            return ['sucess' => 'Usuario atualizado com sucesso'];
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function listar()
    {
        try {
            return $this->usuario->findAll();
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function consultar($id)
    {
        try {
            return $this->usuario->findByID($id);
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function autenticar($identificador, $senha)
    {
        try {
            $usuario = $this->usuario->findByEmailOuApelido($identificador);

            // Exibe o retorno do banco, para testes e verificação
            // var_dump([
            //     "Identificador digitado" => $identificador,
            //     "Senha digitada" => $senha,
            //     "Senha " => $usuario->getSenha(),
            //     "Senha do banco" => $usuario ? password_verify($senha,$usuario->getSenha()) : 'Usuário não encontrado'
            // ]);

            if (!$usuario) {
                return null;
            }

            if (!password_verify($senha, $usuario->getSenha())) return null;

            return [
                "id" => $usuario->getId(),
                "nomeUsuario" => $usuario->getNome(),
                "apelido" => $usuario->getApelido(),
                "email" => $usuario->getEmail(),
                "telefone" => $usuario->getTelefone()
            ];
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }
}
?>