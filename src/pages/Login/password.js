import './login.css';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import { useRef, useState } from 'react';
import api from '../../servicecs/api';
import { Link, useNavigate } from 'react-router-dom';


function Password(){

    const savePasswordUserInputClear = {
        email: "",
        password: "",
        confirmPassword: ""
    }
    const [savePasswordUserInput, setSavePasswordUserInput] = useState(savePasswordUserInputClear);
    const navigate = useNavigate();
    const msgs = useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSavePasswordUserInput((prevData) => ({
            ...prevData,
            [name]: value,
          }));
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await api.put("user/password",savePasswordUserInput);
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
        <div class="content-login" style={{ width: '50%'}}>
            <h3>Cadastre sua senha</h3>
            <form onSubmit={handleSubmit}>
                <div class="formgrid grid">
                 <div class="field col-12">
                    <label><i className="pi pi-at" style={{ fontSize: '1rem'  }}></i>  Email:</label>
                    <InputText value={savePasswordUserInput.email} name='email' type='text' onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                    <label><i className="pi pi-lock" style={{ fontSize: '1rem'  }}></i>  Senha:</label>
                    <InputText value={savePasswordUserInput.password} name='password' type='password' onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                    <label><i className="pi pi-lock" style={{ fontSize: '1rem'  }}></i>  Confirme a Senha:</label>
                    <InputText value={savePasswordUserInput.confirmPassword} name='confirmPassword' type='password' onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                </div>
                <div class="field col-9">
                    <Button icon="pi pi-user" type="submit" label='Enviar' className='buttonLogin'/>
                </div>
            </div>
            </form>    
        </div>    
        </div>
    );
}

export default Password;