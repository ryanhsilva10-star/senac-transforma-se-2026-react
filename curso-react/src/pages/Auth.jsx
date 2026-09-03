import { Link } from "react-router";
import { useState } from 'react';

function Auth() {
    /*const [variavel, set'nome da variavel'] = useState({vazio})*/
const[] = useState (); 
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    


    return (
        <div class="h-full flex">
            <div class="w-1/2 mx-auto my-auto p-5 rounded-lg shadow-md bg-secondary">
                <Link to="/" class="mb-5 flex">Voltar</Link>

                <form class="flex flex-col gap-[20]">
                    Email: <input
                    type="email"
                    value={email}
                    placeholder="Digite o seu email cadastro"
                    onChange={(e)=>setEmail(e.target.value)
                    } />
                    Senha: <input
                    type="password" 
                    placeholder="Digite sua senha cadastrada"
                    onChange={(e) =>setSenha(e.target.value)} />

                    <Link id="btLogin" class="mt-5 bg-primary text-white text-center rounded-md py-2">Entrar</Link>
                </form>
            </div>
        </div>
    )

}
export default Auth;