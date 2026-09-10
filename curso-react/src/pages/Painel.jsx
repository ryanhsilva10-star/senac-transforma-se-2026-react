import { useState, useEffect } from "react";
import { Link } from "react-router";

function Painel() {
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [logged, setLogged] = useState({});

    useEffect(() => {
        const logged = JSON.parse(localStorage.getItem('logged'))
        setLogged(logged)
    }, [])

    useEffect(() => {
        const tempUsers = JSON.parse(localStorage.getItem('users'))
        if(tempUsers) setUsers(tempUsers)
    } , [])


    function handleRegister() {
        const newUsers = [...users, user];
        setUsers([...users, user])
        localStorage.setItem('users', JSON.stringify(newUsers))
        setModal(false)
    }

    function updateUser(pUser) {
        setModal(true)
        setUser(pUser)
    }

    return (
        <div>
            <h3>Bem Vindo, {logged?.nome}</h3>
            {modal && (
                <div
                    className="fixed flex top-0 right-0 bottom-0 
            left-0 items-center justify-center bg-black/50 z-50 ">

                    <div className="relative p-5 bg-about rounded-md 
            shadow-md flex flex-col bg-white w-1/2 ">

                        <a onClick={() => setModal(false)} className="bg-red-500 absolute text-white top-0 right-0 px-2 
                rounded-md cursor-pointer"> X </a>

                        <h2>Cadastre um novo usuário</h2>
                        <p>Preencha as informações abaixo</p>

                        <form className=" flex flex-col">
                            Nome:
                            <input
                                type="text"
                                value={user.nome}
                                placeholder="Digite seu nome completo"
                                onChange={(e) => setUser({ ...user, nome: e.target.value })}

                            />
                            Email:
                            <input
                                type="email"
                                value={user.email}
                                placeholder="Digite o seu melhor email"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                            Senha:
                            <input
                                type="password"
                                placeholder="Letra maiúscula e números"
                                onChange={(e) => setUser({ ...user, senha: e.target.value })}
                            />
                            Data de nascimento:
                            <input
                                type="date" onChange={(e) => setUser({ ...user, nascimento: e.target.value })}
                            />

                            <a onClick={handleRegister}
                                className="mt-5 bg-primary text-white text-center rounded-md py-2">Salvar</a>
                        </form>
                    </div>
                </div>)
            }

            <a onClick={() => setModal(true)} className="rounded-full bg-blue-100 text-white px-4 py-3 fixed bottom-0 right-0"> + </a>

            <table>
                <thead>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                </thead>
                <tbody className="font-secundary">
                    {users.map(u => (
                        <tr>
                            <td>{u.nome}</td>
                            <td>{u.email}</td>
                            <td>
                                <a className='cursor-pointer
                                px-2
                                max-4
                                horver:shadow
                                shadow-md
                                text-white
                                rounded-full
                                bg-green-500'
                                    onClick={() => updateUser(u)}>V</a>

                                <a className='cursor-pointer
                                px-2
                                max-4
                                horver:shadow
                                shadow-md
                                text-white
                                rounded-full
                                bg-green-500'
                                >X</a>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
}

export default Painel;