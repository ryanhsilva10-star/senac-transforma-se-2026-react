import { Link, useNavigate } from "react-router";
import { useState } from 'react';

function Auth() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [msg, setMsg] = useState("");

    const nav = useNavigate();

    function handleLogin() {
        const users =
            JSON.parse(localStorage.getItem('users')) || [];

        let user = users.find(u => {
            return u.email == email;
        });

        if (!user) {
            setMsg("Usuário não encontrado.");
            return;
        }


        if (user.senha == senha) {
            setMsg("Login realizado com sucesso.");
            localStorage.setItem(
                'logged',
                JSON.stringify(user)
            );

            nav('/painel');
        } else {

            setMsg("Senha incorreta.");

        }

    }

    return (
        <div className="h-full flex">
            <div className="w-1/2 mx-auto my-auto p-5 rounded-lg shadow-md bg-secondary">
                <Link to="/" className="mb-5 flex">Voltar</Link>
                <span>
                    {msg}
                </span>
                <form className="flex flex-col gap-[20]">
                    Email: <input
                        type="email"
                        value={email}
                        placeholder="Digite o seu email cadastro"
                        onChange={(e) => setEmail(e.target.value)
                        } />
                    Senha: <input
                        type="password"
                        placeholder="Digite sua senha cadastrada"
                        onChange={(e) => setSenha(e.target.value)} />

                    <Link onClick={handleLogin} className="mt-5 bg-primary text-white text-center rounded-md py-2">Entrar</Link>
                </form>
            </div>
        </div>
    )

}
export default Auth;


