document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Script para gerenciar o cabeçalho dinâmico ---
    const navRightSection = document.getElementById('navRightSection');
    const usuarioLogadoString = localStorage.getItem('usuarioLogado');

    if (usuarioLogadoString) {
        const usuario = JSON.parse(usuarioLogadoString);
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
                <div class="profile-dropdown" id="profileDropdownGerenciarLivros">
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
                        <li><a href="#" id="logoutButtonGerenciarLivros">Sair</a></li>
                    </ul>
                </div>
            </div>
        `;

        const profileDropdown = document.getElementById('profileDropdownGerenciarLivros');
        const logoutButton = document.getElementById('logoutButtonGerenciarLivros');

        window.toggleDropdown = function() {
            if (profileDropdown) {
                profileDropdown.classList.toggle('show');
            }
        };

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
                window.location.href = 'index.html';
            });
        }

    } else {
        navRightSection.innerHTML = `
            <a href="premium.html" class="premium-btn">Torne-se Premium</a>
            <a href="cadastro.html" class="cadastro">Cadastro</a>
            <a href="login.html" class="login">Login</a>
        `;
    }

    // --- 2. Script principal para gerenciar livros ---
    const API_BASE_URL = 'http://localhost/mvc_bookadex/public/api/livro'; 

    // Elementos do formulário de adicionar
    const addBookForm = document.getElementById('addBookForm');
    const addTituloInput = document.getElementById('addTitulo');
    const addAutorInput = document.getElementById('addAutor');
    const addAnoPublicacaoInput = document.getElementById('addAnoPublicacao');
    const addSinopseTextarea = document.getElementById('addSinopse');
    const addBookMessage = document.getElementById('addBookMessage');

    // Elementos da lista de livros
    const bookListBody = document.getElementById('bookListBody');
    const listBookMessage = document.getElementById('listBookMessage');
    const btnListarLivros = document.getElementById('btnListarLivros'); 

    // Elementos do modal de edição
    const editBookModal = document.getElementById('editBookModal');
    const closeButton = editBookModal.querySelector('.close-button');
    const editBookForm = document.getElementById('editBookForm');
    const editIdInput = document.getElementById('editId');
    const editTituloInput = document.getElementById('editTitulo');
    const editAutorInput = document.getElementById('editAutor');
    const editAnoPublicacaoInput = document.getElementById('editAnoPublicacao');
    const editSinopseTextarea = document.getElementById('editSinopse');
    const editBookMessage = document.getElementById('editBookMessage');

    // Funções auxiliares
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `message ${type}`;
        element.style.display = 'block';
        // Oculta a mensagem após 5 segundos, mas só se ela não for 'info' de 'Carregando' para não atrapalhar o clique inicial
        if (type !== 'info' || message !== 'Carregando livros...') { 
            setTimeout(() => {
                element.style.display = 'none'; 
                element.textContent = ''; // Limpa o texto da mensagem
            }, 5000); 
        }
    }

    function formatDateForDisplay(dateString) {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    async function listBooks() {
        // Antes de qualquer coisa, garanta que a mensagem está escondida
        if (listBookMessage) {
            listBookMessage.style.display = 'none'; 
            listBookMessage.textContent = ''; // Limpa qualquer texto anterior
        }
        
        showMessage(listBookMessage, 'Carregando livros...', 'info'); 

        try {
            const response = await fetch(`${API_BASE_URL}s`); 
            if (!response.ok) {
                throw new Error(`Erro ao listar livros: ${response.status} ${response.statusText}`);
            }
            const livros = await response.json(); 
            listBookMessage.style.display = 'none'; // Clear "Carregando" message after fetch

            if (livros.length === 0) {
                showMessage(listBookMessage, 'Nenhum livro encontrado. Cadastre um novo livro para começar!', 'info'); 
                return;
            }

            bookListBody.innerHTML = ''; // Limpa a tabela antes de preencher
            livros.forEach(livro => {
                const row = bookListBody.insertRow();
                row.innerHTML = `
                    <td>${livro.NomeLivro}</td> 
                    <td>${livro.Autor}</td>      
                    <td>${formatDateForDisplay(livro.DataLancamento)}</td> 
                    <td>${livro.Sinopse ? livro.Sinopse.substring(0, 100) + '...' : ''}</td> 
                    <td class="actions">
                        <button class="edit" data-id="${livro.Id}">Editar</button> 
                        <button class="delete" data-id="${livro.Id}">Deletar</button> 
                    </td>
                `;
            });

        } catch (error) {
            console.error('Erro ao listar livros:', error);
            showMessage(listBookMessage, `Erro ao carregar livros: ${error.message}. Verifique o console para mais detalhes.`, 'error');
            bookListBody.innerHTML = ''; // Limpa a tabela em caso de erro também
        }
    }

    // --- 3. Atribuição de Event Listeners ---
    if (addBookForm) { 
        addBookForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            addBookMessage.style.display = 'none';

            const livroData = {
                nomeLivro: addTituloInput.value,    
                autor: addAutorInput.value,
                dataLancamento: addAnoPublicacaoInput.value, 
                sinopse: addSinopseTextarea.value
            };

            try {
                const response = await fetch(API_BASE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(livroData)
                });

                if (!response.ok) {
                    const errorData = await response.json(); 
                    throw new Error(errorData.error || `Erro ao adicionar livro: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                showMessage(addBookMessage, result.success || 'Livro adicionado com sucesso!', 'success');
                addBookForm.reset(); 

                // Opcionalmente, descomente a linha abaixo se quiser recarregar a lista após adicionar
                // listBooks(); 

            } catch (error) {
                console.error('Erro ao adicionar livro:', error);
                showMessage(addBookMessage, `Erro: ${error.message}`, 'error');
            }
        });
    }

    if (btnListarLivros) { 
        btnListarLivros.addEventListener('click', listBooks); 
    }
    
    if (bookListBody) { 
        bookListBody.addEventListener('click', async function(event) {
            if (event.target.classList.contains('edit')) {
                const livroId = event.target.dataset.id;
                try {
                    const response = await fetch(`${API_BASE_URL}/${livroId}`);
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || `Erro ao buscar livro para edição: ${response.status} ${response.statusText}`);
                    }
                    const livro = await response.json();
                    
                    const livroData = Array.isArray(livro) && livro.length > 0 ? livro[0] : livro;

                    if (!livroData || !livroData.Id) { 
                        throw new Error('Dados do livro não encontrados ou inválidos para edição.');
                    }

                    editIdInput.value = livroData.Id; 
                    editTituloInput.value = livroData.NomeLivro; 
                    editAutorInput.value = livroData.Autor; 
                    editAnoPublicacaoInput.value = livroData.DataLancamento; 
                    editSinopseTextarea.value = livroData.Sinopse; 
                    
                    editBookMessage.style.display = 'none'; 
                    
                    if (editBookModal) { 
                        editBookModal.classList.remove('show'); 
                        editBookModal.style.display = 'flex'; 
                        setTimeout(() => {
                            editBookModal.classList.add('show'); 
                        }, 10); 
                    }

                } catch (error) {
                    console.error('Erro ao preparar edição:', error);
                    showMessage(listBookMessage, `Erro ao carregar dados para edição: ${error.message}`, 'error');
                }
            } else if (event.target.classList.contains('delete')) {
                const livroId = event.target.dataset.id;
                if (confirm(`Tem certeza que deseja deletar o livro com ID ${livroId}?`)) {
                    try {
                        const response = await fetch(`${API_BASE_URL}/${livroId}`, {
                            method: 'DELETE'
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.error || `Erro ao deletar livro: ${response.status} ${response.statusText}`);
                        }

                        const result = await response.json();
                        showMessage(listBookMessage, result.sucess || 'Livro deletado com sucesso!', 'success');
                        listBooks(); 

                    } catch (error) {
                        console.error('Erro ao deletar livro:', error);
                        showMessage(listBookMessage, `Erro: ${error.message}`, 'error');
                    }
                }
            }
        });
    }
    
    if (editBookForm) { 
        editBookForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            editBookMessage.style.display = 'none';

            const livroId = editIdInput.value;
            const livroData = {
                nomeLivro: editTituloInput.value,    
                autor: editAutorInput.value,
                dataLancamento: editAnoPublicacaoInput.value, 
                sinopse: editSinopseTextarea.value
            };

            try {
                const response = await fetch(`${API_BASE_URL}/${livroId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(livroData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `Erro ao atualizar livro: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                showMessage(editBookMessage, result.sucess || 'Livro atualizado com sucesso!', 'success');
                
                if (editBookModal) { 
                    editBookModal.classList.remove('show'); 
                    setTimeout(() => { 
                        editBookModal.style.display = 'none';
                    }, 300); 
                }

                listBooks(); 

            } catch (error) {
                console.error('Erro ao atualizar livro:', error);
                showMessage(editBookMessage, `Erro: ${error.message}`, 'error');
            }
        });
    }

    // Eventos do modal
    if (closeButton) { 
        closeButton.addEventListener('click', () => {
            if (editBookModal) {
                editBookModal.classList.remove('show'); 
                setTimeout(() => { 
                    editBookModal.style.display = 'none';
                }, 300); 
            }
        });
    }
    
    if (editBookModal) {
        window.addEventListener('click', (event) => {
            if (event.target === editBookModal) {
                editBookModal.classList.remove('show');
                setTimeout(() => {
                    editBookModal.style.display = 'none';
                }, 300);
            }
        });
    }
});