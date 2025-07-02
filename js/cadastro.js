document.addEventListener('DOMContentLoaded', function() {
    // Código comentado para formatação de data, pode ser ativado se necessário
    /*
    document.getElementById('data').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 2) value = value.substring(0,2) + '/' + value.substring(2);
        if (value.length > 5) value = value.substring(0,5) + '/' + value.substring(5,10);
        e.target.value = value;
    });
    */

    document.getElementById("formCadastro").addEventListener("submit", async function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const apelido = document.getElementById("apelido").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const senha = document.getElementById("senha").value;
        const senha2 = document.getElementById("senha2").value;

        if (!nome || !apelido || !email || !telefone || !senha || !senha2) {
            alert("Preencha todos os campos.");
            return;
        }

        if (senha !== senha2) {
            alert("As senhas não coincidem.");
            return;
        }

        const dados = {
            nomeUsuario: nome,
            apelido,
            email,
            telefone,
            senha
        };

        try {
            const resposta = await fetch("http://localhost/mvc_bookadex/public/api/usuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                // alert("Usuário cadastrado com sucesso!");

                // Oculta o conteúdo da página para evitar mostrar o JSON vindo da API
                document.body.innerHTML = "";

                // Redireciona após 1,5 segundos
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);
            } else {
                alert("Erro: " + (resultado.mensagem || JSON.stringify(resultado)));
            }

        } catch (erro) {
            console.error("Erro ao conectar com a API:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    });
});