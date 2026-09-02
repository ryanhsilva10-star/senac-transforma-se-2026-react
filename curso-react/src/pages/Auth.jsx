import { Link } from "react-router";

function Auth(){
return(
 <div class="h-full flex">
        <div class="w-1/2 mx-auto my-auto p-5 rounded-lg shadow-md bg-secondary">
            <Link to="/" class="mb-5 flex">Voltar</Link>

            <form class="flex flex-col gap-[20]">
                Email: <input id="iEmailLogin" type="email" placeholder="Digite o seu email cadastro" />
              
                Senha: <input id="iPassLogin" type="password" placeholder="Digite sua senha cadastrada" />
              
                <Link  id="btLogin"  class="mt-5 bg-primary text-white text-center rounded-md py-2">Entrar</Link>
            </form>
        </div>
    </div>
)

}
export default Auth;