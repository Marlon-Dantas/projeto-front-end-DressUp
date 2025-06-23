// js/cadastro.js

// --- FUNÇÕES DE VALIDAÇÃO E AUXILIARES ---

// Valida se os campos obrigatórios foram preenchidos
const validarCamposObrigatorios = () => {
    const campos = document.querySelectorAll("input[required], select[required]");
    let formularioValido = true;
    campos.forEach((campo) => {
        if (!campo.value.trim()) {
            formularioValido = false;
            campo.style.borderColor = "red";
        } else {
            campo.style.borderColor = "";
        }
    });
    return formularioValido;
};

// Valida a estrutura do CPF
const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
};


// --- LÓGICA DA API VIACEP ---

// Limpa os campos de endereço antes de preencher
const limparFormularioEndereco = () => {
    document.getElementById("endereco").value = "";
    document.getElementById("estado").value = "";
    // Adicione aqui outros campos que a API preenche, se houver (bairro, cidade, etc.)
}

// Preenche os campos do formulário com os dados da API
const preencherFormularioComCEP = (dadosEndereco) => {
    document.getElementById("endereco").value = dadosEndereco.logradouro;
    document.getElementById("estado").value = dadosEndereco.uf;
    // Adicione aqui outros campos que a API preenche, se houver
}

// Função principal que busca o CEP na API
const pesquisarCep = async () => {
    limparFormularioEndereco();
    
    // Pega o valor do CEP e remove traços e pontos
    const cep = document.getElementById("cep").value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cep.length === 8) {
        try {
            const response = await fetch(url);
            const endereco = await response.json();
            
            if (endereco.hasOwnProperty("erro")) {
                document.getElementById("endereco").value = "CEP não encontrado.";
            } else {
                preencherFormularioComCEP(endereco);
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            document.getElementById("endereco").value = "Erro ao buscar CEP.";
        }
    } else if (cep) { // Só mostra erro se o campo não estiver vazio
        document.getElementById("endereco").value = "CEP inválido.";
    }
}


// --- EVENT LISTENERS (OS "GATILHOS") ---

// Gatilho para a API de CEP: dispara quando o usuário sai do campo CEP
document.getElementById("cep").addEventListener("focusout", pesquisarCep);

// Gatilho principal para o envio do formulário
document.querySelector('form').addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio padrão

    // Executa as validações
    if (!validarCamposObrigatorios()) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }
    
    if (senha.length < 6) {
        alert("A senha deve ter no mínimo 6 caracteres.");
        return;
    }

    const cpf = document.getElementById("cpf").value;
    if (!validarCPF(cpf)) {
        alert("CPF inválido.");
        return;
    }

    // Se tudo estiver OK, coleta os dados
    const form = event.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    // Salva os dados no localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === userData.email);

    if (userExists) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
    window.location.href = 'login.html';
});