// Função para validar campos obrigatórios
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

// Função para validar CPF
const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
};

// Event listener principal do formulário
document.querySelector('form').addEventListener("submit", (event) => {
    event.preventDefault(); // Previne o envio automático para podermos validar tudo

    // --- Executa todas as validações ---
    if (!validarCamposObrigatorios()) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem. Por favor, verifique.");
        return;
    }
    
    if (senha.length < 6) {
        alert("A senha deve ter no mínimo 6 caracteres.");
        return;
    }

    const cpf = document.getElementById("cpf").value;
    if (!validarCPF(cpf)) {
        alert("CPF inválido. Por favor, verifique.");
        return;
    }

    // --- Se todas as validações passaram, coleta os dados ---
    const form = event.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries()); // Cria um objeto com todos os dados do formulário

    // --- Lógica de Salvamento ---
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === userData.email);

    if (userExists) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
    window.location.href = 'TELA-LOGIN-PAULO.html';
});

// A lógica de CEP permanece a mesma, mas com correções
const limparFormulario = () => {
    document.getElementById("endereco").value = "";
    document.getElementById("estado").value = "";
}

const preencherFormulario = (endereco) => {
    document.getElementById("endereco").value = endereco.logradouro;
    document.getElementById("estado").value = endereco.uf;
}

const pesquisarCep = async () => {
    limparFormulario();
    const cep = document.getElementById("cep").value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cep.length === 8) {
        const response = await fetch(url);
        const endereco = await response.json();
        
        if (endereco.hasOwnProperty("erro")) {
            document.getElementById("endereco").value = "CEP não encontrado.";
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById("endereco").value = "CEP inválido.";
    }
}

document.getElementById("cep").addEventListener("focusout", pesquisarCep);