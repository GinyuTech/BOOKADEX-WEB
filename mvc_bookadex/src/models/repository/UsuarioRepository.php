<?php

    namespace src\models\repository;

    use src\config\connection;
    use src\models\entity\Usuario;
    use PDO;

class UsuarioRepository{
    public $conn;

    public function __construct(){

        // instância da classe connection
        $database = new connection();

        // método: estabelecer com a conexão com BD
        $this->conn = $database->getConnection();
    }
         
    public function save(Usuario $usuario){

        // Injeção de SQL
        $query = "INSERT INTO usuario (nomeUsuario,apelido,email,senha,telefone) VALUES (:nomeUsuario, :apelido, :email, :senha, :telefone)";

        $nomeUsuario = $usuario->getNome();
        $apelido = $usuario->getApelido();
        $email = $usuario->getEmail();
        $senha = $usuario->getSenha();
        $telefone = $usuario->getTelefone();

        // criação do stmt(statement)
        $stmt = $this->conn->prepare($query);

        // definição dos parametros
        $stmt->bindParam(":nomeUsuario", $nomeUsuario);
        $stmt->bindParam(":apelido", $apelido);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":senha", $senha);
        $stmt->bindParam(":telefone", $telefone);

        $stmt->execute();
    }

    public function findAll(){
        $query = "SELECT * FROM USUARIO";

        $stmt = $this->conn->prepare($query); 
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findByID($id){
        $query = "SELECT * FROM USUARIO WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id",$id);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update(Usuario $usuario){

        // $comando ou $sql
        $query = "UPDATE usuario SET nomeUsuario = :nomeUsuario, apelido = :apelido, email = :email, 
                    senha = :senha, telefone = :telefone WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        // atribuição das variaveis
        $nomeUsuario = $usuario->getNome();
        $apelido = $usuario->getApelido();
        $email = $usuario->getEmail();
        $senha = $usuario->getSenha();
        $telefone = $usuario->getTelefone();
        $id = $usuario->getId();

        // atribuir os valores nos parametros
        $stmt->bindParam(":nomeUsuario", $nomeUsuario);
        $stmt->bindParam(":apelido", $apelido);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":senha", $senha);
        $stmt->bindParam(":telefone", $telefone);
        $stmt->bindParam(":id", $id);

        // executando a query
        $stmt-> execute();    
    }

    public function delete($id){
        $query = "DELETE FROM usuario WHERE id = :id";

         $stmt = $this->conn->prepare($query);
         $stmt -> bindParam(":id", $id);
         $stmt->execute(); 
    }

    public function findByEmailOuApelido(string $valor): ?Usuario {
        try {
            $query = "SELECT Id, NomeUsuario, Apelido, Email, Senha, Telefone FROM usuario WHERE email = :valor OR apelido = :valor LIMIT 1";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":valor", $valor, PDO::PARAM_STR);
            $stmt->execute();

            $dados = $stmt->fetch(PDO::FETCH_ASSOC); // Obtém apenas uma linha

            if ($dados) {
                // Instancia e preenche o objeto Usuario com os dados do banco
                $usuario = new Usuario(
                    $dados['NomeUsuario'],
                    $dados['Apelido'],
                    $dados['Email'],
                    $dados['Senha'],
                    $dados['Telefone']
                );
                $usuario->setId($dados['Id']);
                return $usuario;
            }

            return null; // Nenhum usuário encontrado

        } catch (\Exception $e) {
            // Captura erros de banco de dados e relança uma exceção
            throw new \Exception("Erro ao buscar usuário no banco de dados.");
        }
    }
}
?>