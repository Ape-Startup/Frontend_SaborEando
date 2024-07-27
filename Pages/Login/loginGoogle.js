async function handleCredentialResponse(response) {
    try {
        // Decodificar o token JWT recebido
        const data = jwt_decode(response.credential);
        console.log("Decoded JWT data:", data);

        // Enviar o token para o servidor
        const loginDados = { token: response.credential };
        console.log("Sending login data:", loginDados);

        const res = await fetch('http://localhost:6005/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDados)
        });

        // Processar a resposta do servidor
        const responseData = await res.json();
        console.log("Response from server:", responseData);

        if (responseData.error) {
            alert("Credenciais inválidas");
            console.log("Error details:", responseData.error);
        } else {
            alert("Logado com sucesso");
            console.log("Login data sent:", loginDados);
            console.log("Server response:", responseData);
            window.location.href = "../../Pages/Home/home.html"; // Redirecionar após o login
        }
    } catch (error) {
        console.error('Erro:', error);
        alert("Ocorreu um erro ao tentar fazer login");
    }
}

// Inicializar o Google Identity Services quando a página for carregada
window.onload = function () {
    console.log("Initializing Google Identity Services...");

    google.accounts.id.initialize({
        client_id: "846269124499-3hh25uqra9to0iopp5j3coo3csqqq2el.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // Atributos de personalização
    );

    google.accounts.id.prompt(); // Também exibe o diálogo One Tap
    console.log("Google Identity Services initialized and button rendered.");
}
