document.addEventListener('DOMContentLoaded', function() {
    const navRightSection = document.getElementById('navRightSectionCategorias'); // Usando o ID que já existe no seu HTML

    // Verifica se a seção do cabeçalho existe na página atual
    if (!navRightSection) {
        // Se não existir (ex: página sem cabeçalho específico), encerra
        return;
    }

    const usuarioLogadoString = localStorage.getItem('usuarioLogado');

    if (usuarioLogadoString) {
        // Se houver usuário logado, parseia os dados
        const usuario = JSON.parse(usuarioLogadoString);

        // Constrói o HTML dinamicamente com os dados do usuário para a navegação
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
                <div class="profile-dropdown" id="profileDropdownCategorias">
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
                        <li><a href="#" id="logoutButtonCategorias">Sair</a></li>
                    </ul>
                </div>
            </div>
        `;

        // Adicionar listeners para o dropdown e logout após os elementos serem criados
        const profileDropdown = document.getElementById('profileDropdownCategorias');
        const logoutButton = document.getElementById('logoutButtonCategorias');

        // Torna a função toggleDropdown globalmente acessível
        window.toggleDropdown = function() {
            if (profileDropdown) {
                profileDropdown.classList.toggle('show');
            }
        };

        // Fecha o dropdown se clicar fora dele
        window.onclick = function(event) {
            if (!event.target.matches('.imgprofile img')) {
                if (profileDropdown && profileDropdown.classList.contains('show')) {
                    profileDropdown.classList.remove('show');
                }
            }
        };

        if (logoutButton) {
            logoutButton.addEventListener('click', function(event) {
                event.preventDefault();
                localStorage.removeItem('usuarioLogado');
                window.location.href = 'index.html'; // Redireciona para recarregar a página com os botões de login
            });
        }

    } else {
        // Se não houver usuário logado, mostra os botões de cadastro/login
        navRightSection.innerHTML = `
            <a href="premium.html" class="premium-btn">Torne-se Premium</a>
            <a href="cadastro.html" class="login">Cadastro</a>
            <a href="login.html" class="login">Login</a>
        `;
    }
});