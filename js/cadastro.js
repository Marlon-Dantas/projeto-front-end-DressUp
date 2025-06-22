const validarFormulario = () => {
    const campos = document.querySelectorAll("input[required]");
    let formularioValido = true;

    campos.forEach((campo) => {
        if (!campo.value.trim()) {
            formularioValido = false;
            campo.style.borderColor = "red";
        } else {
            campo.style.borderColor = "";
        }
    });

    if (!formularioValido) {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }

    return formularioValido;
};

document.getElementById("formulario").addEventListener("submit", (event) => {
    if (!validarFormulario()) {
        event.preventDefault();
    }
});

const eNumero = (numero) => /^\[0-9]+$/.test(numero);
const ecepValido = (cep) => cep.length == 8 && eNumero(cep);
const limparFormulario = () => {
    document.getElementById("endereço").value = "";
    document.getElementById("estado").value = "";
}
const preencherFormulario = (endereço) => {
    document.getElementById("endereço").value = "endereço.logradouro";
    document.getElementById("estado").value = "endereço.uf";
}
const pesquisarCep = async () => {
    limparFormulario();

    const cep = document.getElementById("cep").value.replace("-", "");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (ecepValido(cep)) {
        const dados = await fetch(url)
        await dados.json()
    if (endereço.hasOwnProperty("erro")) {
            document.getElementById("endereço").value = "CEP não encontrado.";
        }
        else {
            preencherFormulario(endereço);
        }
    }
    else {
        document.getElementById("endereço").value = "CEP inválido.";
    }
}

document.getElementById("cep").addEventListener("focusout", pesquisarCep);

document.getElementById("formulario").addEventListener("submit", (event) => {
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        event.preventDefault();
        alert("As senhas não coincidem. Por favor, verifique.");
    }
});

const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const calcularDigito = (base) => {
        let soma = 0;
        for (let i = 0; i < base.length; i++) {
            soma += parseInt(base.charAt(i)) * (base.length + 1 - i);
        }
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    const base = cpf.substring(0, 9);
    const digito1 = calcularDigito(base);
    const digito2 = calcularDigito(base + digito1);

    return cpf === base + digito1 + digito2;
};

document.getElementById("formulario").addEventListener("submit", (event) => {
    const cpf = document.getElementById("cpf").value;

    if (!validarCPF(cpf)) {
        event.preventDefault();
        alert("CPF inválido. Por favor, verifique.");
    }
});
document.getElementById("formulario").addEventListener("submit", (event) => {
    const nome = document.getElementById("nome").value.trim();
    const telefoneCelular = document.getElementById("telefoneCelular").value.trim();
    const telefoneFixo = document.getElementById("telefoneFixo").value.trim();
    const login = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const nomeValido = /^[a-zA-Z\s]{15,80}$/.test(nome);
    const telefoneValido = /^\(\+55\)\d{2}-\d{8}$/.test(telefoneCelular) && /^\(\+55\)\d{2}-\d{8}$/.test(telefoneFixo);
    const loginValido = /^[a-zA-Z]{6}$/.test(login);
    const senhaValida = /^[a-zA-Z]{8}$/.test(senha);

    if (!nomeValido) {
        event.preventDefault();
        alert("O campo Nome deve ter entre 15 e 80 caracteres alfabéticos.");
    }

    if (!telefoneValido) {
        event.preventDefault();
        alert("Os campos Telefone Celular e Telefone Fixo devem estar no formato (+55)XX-XXXXXXXX.");
    }

    if (!loginValido) {
        event.preventDefault();
        alert("O campo Login deve ter exatamente 6 caracteres alfabéticos.");
    }

    if (!senhaValida) {
        event.preventDefault();
        alert("O campo Senha deve ter exatamente 8 caracteres alfabéticos.");
    }
});