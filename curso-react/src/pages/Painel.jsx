import { useState } from "react";
import { Link } from "react-router";

function Painel() {
    const [modal, setModal] = useState(false);

    return (
        <div>
            <h3 id="hello"></h3>
            {modal && (
                <div
                    className="fixed flex top-0 right-0 bottom-0 
            left-0 items-center justify-center bg-black/50 z-50 ">

                    <div className="relative w-full p-5 bg-about rounded-lg 
            shadow-md flex flex-col bg-white w-1/2 ">

                        <a
                            className="bg-prices absolute top-0 right-0 px-2 
                rounded-full cursor-pointer">
                            X
                        </a>
                        <h2>Cadastre um novo usuário</h2>
                        <p>Preencha as informações abaixo</p>

                        <form className="flex column">
                            Nome:
                            <input
                                type="text"
                                placeholder="Digite seu nome completo" />
                            Email:
                            <input
                                type="email"
                                placeholder="Digite o seu melhor email" />

                            Senha:
                            <input
                                type="password"
                                placeholder="Letra maiúscula e números" />
                            Data de nascimento:
                            <input
                                type="date" />

                            <a className="mt-5 bg-primary text-white text-center rounded-md py-2">Salvar</a>
                        </form>
                    </div>
                </div>)
                }
            <table>
                <thead>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                </thead>
                <tbody className="font-secundary">

                </tbody>
            </table>

            <a onClick={()=> setModal(true)} className="rounded-full bg-blue-100 text-white px-4 py-3 fixed bottom-0 right-0"> + </a>
            <a onClick={()=> setModal(false)} className="rounded-full bg-red-100 text-white px-4 py-3 fixed bottom-0 right-0"> - </a>
        </div>
    );
}

export default Painel;