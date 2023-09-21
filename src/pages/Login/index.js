import './login.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
        

import { useState, useRef } from 'react';
import api from '../../servicecs/api';
import { Link, useNavigate } from 'react-router-dom';

function Login(){

    const userLoginEmpty = {
        email: '',
        password: ''
    }
    const [userLogin, setUserLogin] = useState(userLoginEmpty);
    const navigate = useNavigate();
    const msgs = useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserLogin((prevData) => ({
            ...prevData,
            [name]: value,
          }));
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await api.get("user/login", {
            params: {
                email: userLogin.email,
                password: userLogin.password
            }
          });
          console.log(response);
          if(response.status === 200){
            navigate('/home');
          }
        } catch (error) {
            msgs.current.show(
                { sticky: true, severity: 'error', summary: 'erro', detail: 'Email ou Senha com erro, corrija e tente novamente', closable: false }
            );
        }
    
      };

    return(
        <div class="container-login">
            <div class="content-login">
                <h1>Educ Web <i className="pi pi-home" style={{ fontSize: '2rem'  }}></i> </h1>
                <br/>
                <Messages ref={msgs} />
                <form onSubmit={handleSubmit}>
                <div class="formgrid grid">
                 <div class="field col-12">
                    <label><i className="pi pi-at" style={{ fontSize: '1rem'  }}></i>  Email:</label>
                    <InputText value={userLogin.email} name='email' type='text' onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                    <label><i className="pi pi-lock" style={{ fontSize: '1rem'  }}></i>  Senha:</label>
                    <InputText value={userLogin.password} name='password' type='password' onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                </div>
                <div class="field col-8">
                    <Button icon="pi pi-user" type="submit" label='Entrar' className='buttonLogin'/>
                </div>
                <div class="field col-4">
                    <Link to="/password" className='first-access'><i className="pi pi-users" style={{ fontSize: '1.2rem', marginTop: '5px' }}></i> Primeiro acesso</Link>
                </div>
                </div>
                </form>
            </div>
        </div>
    )
}
export default Login;