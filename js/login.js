document.addEventListener('DOMContentLoaded', function() {
    // Lógica para o cabeçalho (igual ao index.html para consistência)
    const navRightSection = document.getElementById('navRightSectionLogin');
    const usuarioLogadoString = localStorage.getItem('usuarioLogado');

    if (usuarioLogadoString) {
        const usuario = JSON.parse(usuarioLogadoString);
        // Usuário logado: Exibir informações do perfil
        navRightSection.innerHTML = `
            <a href="premium.html" class="premium-btn">Torne-se Premium</a>
            <div class="tokens">
                <img class="polvoeda" src="img/img_loja/polvoeda.png" alt="">
                <p id="polvoedas">${usuario.polvoedas || 0}</p>
                <img class="mdldi" src="img/img_loja/octoken.png" alt="">
                <p id="octokens">${usuario.octokens || 0}</p>
            </div>
            <div class="imgprofile" onclick="toggleDropdown()">
                <img src="${usuario.fotoPerfil || 'img/img_perfil/default_profile.png'}" alt="" id="profileImageHeader">
                <div class="profile-dropdown" id="profileDropdownLogin">
                    <div class="profile-header">
                        <img src="${usuario.fotoPerfil || 'img/img_perfil/default_profile.png'}" alt="Foto de Perfil" class="dropdown-profile-img" id="profileImageDropdown">
                        <div>
                            <p class="profile-username" id="profileUsername">${usuario.apelido || 'Usuário'}</p>
                            <p class="profile-name" id="profileName">${usuario.nomeUsuario || 'Nome Completo'}</p>
                            <p class="profile-points"><span>Pontos:</span> <span id="profilePoints">${usuario.pontos || 0}</span></p>
                        </div>
                    </div>
                    <ul class="profile-options">
                        <li><a href="meuperfil.html">Meu Perfil</a></li>
                        <li><a href="personagem.html">Personagem</a></li>
                        <li><a href="meusquiz.html">Meus quizzes</a></li>
                        <li><a href="config.html">Configurações</a></li>
                        <li><a href="#" id="logoutButtonLogin">Sair</a></li>
                    </ul>
                </div>
            </div>
        `;

        // Adicionar listeners para o dropdown e logout após os elementos serem criados
        const profileDropdown = document.getElementById('profileDropdownLogin');
        const logoutButton = document.getElementById('logoutButtonLogin');

        window.toggleDropdown = function() {
            if (profileDropdown) {
                profileDropdown.classList.toggle('show');
            }
        };

        // Fecha o dropdown se clicar fora dele
        window.addEventListener('click', function(event) {
            if (!event.target.matches('.imgprofile img')) {
                if (profileDropdown && profileDropdown.classList.contains('show')) {
                    profileDropdown.classList.remove('show');
                }
            }
        });

        if (logoutButton) {
            logoutButton.addEventListener('click', function(event) {
                event.preventDefault();
                localStorage.removeItem('usuarioLogado');
                window.location.href = 'index.html'; // Redireciona para recarregar a página com os botões de login
            });
        }

    } else {
        // Usuário não logado: Exibir botões de Cadastro e Login (como já está no seu HTML original)
        navRightSection.innerHTML = `
            <a href="premium.html" class="premium-btn">Torne-se Premium</a>
            <a href="cadastro.html" class="login">Cadastro</a>
        `;
    }

    // Lógica de login
    const formlogin = document.getElementById("formlogin");
    const identificadorInput = document.getElementById("identificador");
    const senhaInput = document.getElementById("senha");
    const mensagemErro = document.getElementById("mensagemErro");

    formlogin.addEventListener("submit", async function (e) {
        e.preventDefault(); // Impede envio padrão

        const identificador = identificadorInput.value.trim();
        const senha = senhaInput.value;

        if (!identificador || !senha) {
            mensagemErro.textContent = "Preencha todos os campos.";
            return;
        }
        
        mensagemErro.textContent = ""; // Limpa mensagens de erro anteriores

        try {
            const resposta = await fetch("http://localhost/mvc_bookadex/public/api/usuario/autenticar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identificador, senha })
            });
            
            const dados = await resposta.json(); // Use await aqui para garantir que a promessa seja resolvida
            // console.log(dados)
            if (resposta.ok && dados.usuario) { // Verifica se a resposta foi OK e se o objeto 'usuario' existe
                const usuarioParaSalvar = {
                    id: dados.usuario.id,
                    nomeUsuario: dados.usuario.nomeUsuario, 
                    apelido: dados.usuario.apelido,    
                    email: dados.usuario.email,
                    telefone: dados.usuario.telefone,
                    // Estes campos (pontos, polvoedas, octokens, fotoPerfil) PRECISAM vir da sua API.
                    // Se não vierem, eles terão valores padrão (0 ou a imagem default).
                    pontos: dados.usuario.pontos || 0, 
                    polvoedas: dados.usuario.polvoedas || 0, 
                    octokens: dados.usuario.octokens || 0,    
                    fotoPerfil: dados.usuario.fotoPerfil || 'img/img_perfil/default_profile.png' 
                };

                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioParaSalvar));
                // alert("Login bem-sucedido! Redirecionando...");
                window.location.href = "categorias.html"; // Redireciona para a página inicial
            } else {
                // Se resposta.ok for true mas dados.usuario não existir, ou se resposta.ok for false
                mensagemErro.textContent = dados.mensagem || "Email/apelido ou senha inválidos.";
            }

        } catch (erro) {
            console.error("Erro ao fazer login:", erro); // Use console.error para erros
            mensagemErro.textContent = "Erro ao conectar com o servidor. Verifique sua conexão.";
        }
    });
});