import { useState, useEffect } from "react";
import {supabase} from '../../utils/supabase'

function Painel() {
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [logged, setLogged] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [index, setIndex] = useState(-1);
    
    const [spiner, setSpider] = useState (false);
    const [msg,setMsg] = useState ('');

    useEffect(() => {
        const logged = JSON.parse(localStorage.getItem('logged'))
        setLogged(logged)
    }, [])

    useEffect(() => {
       loadUsers()
    }, [])
    //Read = Ler
    async function loadUsers() {
        //data e error estão assim porque eu nomeio elas
        const {data, error} = await supabase.from('alunos').select('*')
        //Tratamento
        if(error){
            setMsg(error.mensage)
            return;

        }

        setUsers(data)
    }
    async function editUser(){
        const { data, error } = await supabase
            .from('alunos')
            .update(user)
            .eq('id', index)
        if(error){
            setMsg(error.message)
            setSpider(false)
            return;        
        }

        setMsg("Usuario editado")
        setSpider(false)
        loadUsers()
    //Delete =
    }

    async function deleteUser(){
        const { error } = await supabase
            .from('alunos')
            .delete()
            .eq('id', index);

        if(error){
            setMsg(error.message)
            return;        
        }
        setMsg("Usuario deletado")
        loadUsers()
    }


    function updateUser(user){
        setModal(true)
        setUser(user)
        setIndex(user.id)
    }

    async function handleRegister(){
        setSpider(true);
        const {
            data: authData, error: authError 
        } = await supabase.auth.signUp({
            email: user.email,
            password: user.senha
        });

        if(authError){
            setMsg(authError.message)
            setSpider(false)
            return;
        }

        if(!authData){
            setMsg("Não foi possivel cadastrar, verifique sua internet")
            setSpider(false)
            return;
        }

        const {
            data: loginData, error: loginError
        }= await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.senha
        });

        const { 
            error: alunosError 
        } = await supabase
            .from('alunos')
            .insert({
            user_id:loginData.user.id,
            
        });

    
       if(alunosError){
            setMsg(alunosError.message)
            setSpider(false)
            return;
        }

        if(loginError){
            setMsg("Não foi possivel cadastrar, verifique sua internet")
            setSpider(false)
            return;
        }

    }

    return (
        <div>
            <h3>Bem Vindo, {logged?.nome}</h3>
            {modal && (
                <div
                    className="fixed flex top-0 right-0 bottom-0 
                    left-0 items-center justify-center bg-black/50 z-50 "
                >

                    <div className="relative p-5 bg-about rounded-md 
                        shadow-md flex flex-col bg-white w-1/2 "
                    >

                        <a onClick={() => setModal(false)} className="bg-red-500 absolute text-white top-0 right-0 px-2 
                            rounded-md cursor-pointer"
                        > X </a>

                        <h2>Cadastre um novo usuário</h2>
                        <p>Preencha as informações abaixo</p>


                        { isEdit ? (
                            <form className="flex flex-col">
                                Nome:
                                <input value={user.nome} onChange={ (e) => setUser({...user, nome: e.target.value }) } type="text" placeholder="Digite seu nome completo" />
                                 {!index && (
                                    <>
                                        Email:
                                        <input value={user.email} onChange={ (e) => setUser({...user, email: e.target.value }) }  type="email" placeholder="Digite o seu melhor email" />
                                        
                                        Senha:
                                        <input onChange={ (e) => setUser({...user, senha: e.target.value }) }  type="password" placeholder="Letra maiúscula e números" />

                                    </>
                                 )}                    
                                

                                Data de nascimento:
                                <input value={user.nascimento} onChange={ (e) => setUser({...user, nascimento: e.target.value }) }  type="date" />
                                
                                Matricula:
                                <input value={user.matricula} onChange={ (e) => setUser({...user, matricula: e.target.value }) } type="text" placeholder="Digite sua matricula" />
                                
                                Celular:
                                <input value={user.celular} onChange={ (e) => setUser({...user, celular: e.target.value }) } type="number" placeholder="Digite seu celular" />
                                { index != -1 && (
                                    <a onClick={()=> setIsEdit(false)} className="mt-5 text-black text-center rounded-md py-2 bg-red-300">
                                        Cancelar
                                    </a>
                                    )
                                }

                                <a onClick={
                                    ()=>{
                                        if (index == -1)
                                            handleRegister()
                                        else 
                                            editUser()
                                    }
                                }  
                                className="mt-5 bg-primary text-white text-center rounded-md py-2"
                                > 
                                {spiner? '...' :'Salvar'}</a>
                                {msg}
                            </form>
                            ): //else 
                            (
                            <>
                                <p> Nome: {user.nome}</p>
                                <p> Email: {user.email}</p>
                                <p> Matricula: {user.matricula}</p>
                                <p> Celular: {user.celular}</p>
                                <p> Data de Nascimento: {user.nascimento}</p>
                                <a onClick={()=> setIsEdit(true)} className="mt-5 bg-primary text-black text-center rounded-md py-2 bg-yellow-500">Editar</a>
                            </>    
                            )
                        }

                    </div>
                </div>
            )}

            <a onClick={() => {
                    setModal(true)
                    setIsEdit(true)
                }}
                className="rounded-full bg-primary text-white 
                    px-4 py-3 fixed bottom-0 right-0"
            > + </a>

            <table>
                <thead>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                </thead>
                <tbody className="font-secundary">
                    {users.map( (u) => (
                        <tr key = {u.id}>
                            <td>{u.nome}</td>
                            <td>{u.email}</td>
                            <td>{u.matricula}</td>
                            <td>{u.celular}</td>
                            <td>
                                <a className='cursor-pointer
                                            px-2
                                            mx-4
                                            hover:shadow
                                            shadow-md
                                            text-white
                                            rounded-full
                                            bg-green-500'
                                    onClick={()=> updateUser(u)}
                                >V</a>
                                <a className='cursor-pointer
                                            px-2
                                            mx-4
                                            hover:shadow
                                            shadow-md
                                            text-white
                                            rounded-full
                                            bg-red-500'
                                    onClick={()=> deleteUser(u)}
                                >X</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Painel;