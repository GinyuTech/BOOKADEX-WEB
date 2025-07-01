<?php

namespace src\controllers;

use src\services\LivroService;

class LivroController
{
    private $service;

    public function __construct()
    {
        $this->service = new LivroService();
    }

    public function criar()
    {
        try {
            $data = json_decode(file_get_contents("php://input"));
            echo json_encode(
                $this->service->criar($data->nomeLivro, $data->sinopse, $data->autor, $data->dataLancamento)
            );
        } catch (\Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function remover($id)
    {
        echo json_encode($this->service->remover($id));
    }

    public function atualizar($id)
    {
        $data = json_decode(file_get_contents("php://input"));
        echo json_encode($this->service->atualizar($id, $data->nomeLivro, $data->sinopse, $data->autor, $data->dataLancamento));
    }

    public function listar()
    {
        echo json_encode($this->service->listar());
    }

    public function consultar($id)
    {
        echo json_encode($this->service->consultar($id));
    }

    public function hello()
    {
        echo 'Olá PHP';
    }
}
