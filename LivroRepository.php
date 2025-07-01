<?php

    namespace src\models\repository;

    use src\config\connection;
    use src\models\entity\Livro;
    use PDO;

class LivroRepository{
    public $conn;

    public function __construct(){
        
        $database = new connection();

        $this->conn = $database->getConnection();
    }

    public function save(Livro $livro){

        $query = "INSERT INTO livro (nomeLivro, sinopse, autor, dataLancamento) VALUES (:nomeLivro, :sinopse, :autor, :dataLancamento)";
        
        $nomeLivro = $livro->getNome();
        $sinopse = $livro->getSinopse();
        $autor = $livro->getAutor();
        $dataLancamento = $livro->getData();

         $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":nomeLivro", $nomeLivro);
        $stmt->bindParam(":sinopse", $sinopse);
        $stmt->bindParam(":autor", $autor);
        $stmt->bindParam(":dataLancamento", $dataLancamento);

        $stmt->execute();
    }

    public function findALL(){
        $query = "SELECT * FROM LIVRO";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findByID($id){
        $query = "SELECT * FROM LIVRO WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update(Livro $livro){

        $query = "UPDATE LIVRO SET nomeLivro = :nomeLivro, sinopse = :sinopse, autor = :autor, 
                    dataLancamento = :dataLancamento WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $nomeLivro = $livro->getNome();
        $sinopse = $livro->getSinopse();
        $autor = $livro->getAutor();
        $dataLancamento = $livro->getData();
        $id = $livro -> getId();

        $stmt->bindParam(":nomeLivro", $nomeLivro);
        $stmt->bindParam(":sinopse", $sinopse);
        $stmt->bindParam(":autor", $autor);
        $stmt->bindParam(":dataLancamento", $dataLancamento);
        $stmt->bindParam(":id", $id);

        $stmt->execute();
    }

    public function delete($id){
        $query = "DELETE FROM LIVRO WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id",$id);
        $stmt->execute();
    }
}

?>