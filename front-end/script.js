function submitForm(event) {
    event.preventDefault(); 

    var username = document.getElementById("floatingInput").value;
    var password = document.getElementById("floatingPassword").value;

    var data = {
        login: username,
        password: password
    };

    fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log('Status da resposta:', response.status);
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Authentication failed');
        }
    })
    .then(user => {
        let dados = JSON.parse(user);
        sessionStorage.setItem('cpf', dados.cpf);
        sessionStorage.setItem('saldo', dados.saldo);
        sessionStorage.setItem('public', dados.saldo);
        sessionStorage.setItem('private', dados.saldo);
        window.location.href = 'dashboard.html';
    })
    .catch(error => {
        console.error('Erro:', error);
        var errorMessage = document.getElementById("error-message");
        errorMessage.innerText = 'Usuário ou senha incorretos';
        errorMessage.style.display = 'block';
    });
}

        function NewUser(event) {
            event.preventDefault(); 
        
            var username = document.getElementById("NewLogin").value;
            var password = document.getElementById("NewPassword").value;
            var cpf = document.getElementById("NewCpf").value;
        
            var data = {
                login: username,
                password: password,
                cpf: cpf,
                saldo: 1000
            };
        
            fetch('http://localhost:5000/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    throw new Error('Ocorreu um erro no cadastro');
                }
            })
            .then(user => {
                var successMessage = document.getElementById("success-message");
                successMessage.innerText = 'Cadastro efetuado com sucesso!';
                successMessage.style.display = 'block';
                
            })
            .catch(error => {
                console.error('Erro:', error);
                var errorMessage = document.getElementById("error-message");
                errorMessage.innerText = 'Ocorreu um erro no cadastro.';
                errorMessage.style.display = 'block';
            });
        }
        
        //Funções de interface
        document.getElementById('abrirFormulario').addEventListener('click', function() {
            document.getElementById('formularioModal').style.display = 'block';
          });
          
          document.getElementById('fecharFormulario').addEventListener('click', function() {
            document.getElementById('formularioModal').style.display = 'none';
          });
          
          // Fechar o formulário se o usuário clicar fora dele
          window.addEventListener('click', function(event) {
            if (event.target == document.getElementById('formularioModal')) {
              document.getElementById('formularioModal').style.display = 'none';
            }
          });

          document.addEventListener('DOMContentLoaded', function() {
            // Recupere os dados da sessionStorage
            var cpf = sessionStorage.getItem('cpf');
            var saldo = sessionStorage.getItem('saldo');
            var sald= document.getElementById('sald');
            sald.innerText = 'Lc ' + saldo;
            var publicData = sessionStorage.getItem('public');
            var privateData = sessionStorage.getItem('private');
        
            // Faça o que for necessário com os dados recuperados
            console.log('CPF:', cpf);
            console.log('Saldo:', saldo);
            console.log('Public:', publicData);
            console.log('Private:', privateData);
        
            // Limpe os dados da sessionStorage se necessário
            sessionStorage.removeItem('cpf');
            sessionStorage.removeItem('saldo');
            sessionStorage.removeItem('public');
            sessionStorage.removeItem('private');
        });
        