// js/meuPerfilAtualizar.js

document.addEventListener('DOMContentLoaded', function() {
    const updateProfileButton = document.getElementById("updateProfileButton");
    const profileupdateForm = document.getElementById("profileupdateForm"); // O formulário agora tem um ID

    if (updateProfileButton) {
        updateProfileButton.addEventListener("click", async function (e) {
            e.preventDefault(); // Impede o comportamento padrão do botão

            const nome = document.getElementById("inputname").value;
            const apelido = document.getElementById("inputuser").value;
            const email = document.getElementById("inputemail").value;
            const telefone = document.getElementById("inputphone").value;

            // Supondo que você tem o ID do usuário logado no localStorage
            const usuarioLogadoString = localStorage.getItem('usuarioLogado');
            if (!usuarioLogadoString) {
                alert("Usuário não logado. Por favor, faça login.");
                window.location.href = "login.html";
                return;
            }
            const usuario = JSON.parse(usuarioLogadoString);
            const userId = usuario.idUsuario; // Certifique-se de que seu objeto de usuário tem 'idUsuario'

            if (!nome || !apelido || !email || !telefone) {
                alert("Preencha todos os campos.");
                return;
            }

            const dados = {
                NomeUsuario: nome,
                apelido: apelido,
                email: email,
                senha: "123", // Considerar como a senha será tratada na atualização
                telefone: telefone
            };

            try {
                // Usando o userId do localStorage na URL da API
                const resposta = await fetch(`http://localhost/mvc_bookadex/public/api/usuario/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dados)
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    alert("Perfil atualizado com sucesso!");

                    // Se a atualização foi bem-sucedida, atualize os dados no localStorage
                    // E recarregue a página para que meuPerfilUI.js preencha com os novos dados
                    const usuarioAtualizado = { ...usuario, ...dados }; // Mescla os dados atualizados
                    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));

                    // Redireciona para recarregar a página com os novos dados
                    window.location.reload();

                } else {
                    alert("Erro ao atualizar perfil: " + (resultado.mensagem || JSON.stringify(resultado)));
                }

            } catch (erro) {
                console.error("Erro ao conectar com a API:", erro);
                alert("Erro ao conectar com o servidor.");
            }
        });
    }
});