import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState, useEffect } from "react";
import api from "../../servicecs/api";
import { InputMask } from "primereact/inputmask";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";


function User(){

    const [visibleNovo, setVisibleNovo] = useState(false);
    const [users, setUsers] = useState([]);
    const [totUser, setTotUser] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const userInputClear = {
        id: null,
        email: "",
        name: "",
        phoneNumber: "",
        cpf: ""
    }
    const [userInput, setUserInput] = useState(userInputClear);

    async function loadUsers(page, size) {
        const response = await api.get("user", {
          params: {
            page: page,
            size: size
          }
        });
        setTotUser(response.data.totalElements);
        setUsers(response.data.content);
    }

    useEffect(() => {
        loadUsers(currentPage, 10);
    }, [currentPage]);

    const onPageChange = event => {
        setCurrentPage(event.first / event.rows);
    };  
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInput((prevData) => ({
            ...prevData,
            [name]: value,
          }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await api.post('user', userInput);
          if(response.status === 200){

            setUserInput(userInputClear);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      const footer = `Total: ${totUser} Usuários.`;

      const onSelectionChange = (event) => {
        const value = event.value;
        setUserInput(value);
      };

      async function deleteUser(){
        const response = await api.delete("user", {
          params: {
            id: userInput.id
          }
        });
      }

    return(
        <div className="container">
            <div className="lista">
                <h2>Usuário</h2>

                <Button label="Novo" icon="pi pi-plus" onClick={() => setVisibleNovo(true)} />
                <Button label="Alterar" severity="help" style={{ marginLeft: '8px' }} icon="pi pi-pencil" disabled={userInput.id === null} onClick={() => setVisibleNovo(true)} />
                <Button label="Deletar" severity="danger" style={{ marginLeft: '8px' }} icon="pi pi-trash" disabled={userInput.id === null} onClick={deleteUser} />

                <DataTable value={users} paginator rows={10} onPage={onPageChange} className="datatable-container" footer={footer}
                           selection={userInput} onSelectionChange={onSelectionChange} selectionMode="single">
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} />        
                    <Column field="name" header="Nome" />
                    <Column field="cpf" header="CPF" />
                    <Column field="email" header="Email" />
                    <Column field="phoneNumber" header="Telefone" />
                    
                </DataTable>

                <Dialog header="Usuário" visible={visibleNovo} onHide={() => setVisibleNovo(false)} style={{ width: '40%'}}>
                    <form onSubmit={handleSubmit}>
                        <div class="formgrid grid">
                            <div class="field col-12">
                                <label>Nome:</label>
                                <InputText value={userInput.name}  type="text" name="name" onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                                <label>Email:</label>
                                <InputText value={userInput.email}  type="email" name="email" onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                                <label>CPF:</label>
                                <InputMask value={userInput.cpf} mask="999.999.999-99"  type="text" name="cpf" onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />                               
                                <label>Telefone:</label>
                                <InputMask value={userInput.phoneNumber} mask="(99) 999999999"  type="text" name="phoneNumber" onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />                               
                            </div>
                            <div class="field col-9">
                                <Button type="submit" onClick={() => setVisibleNovo(false)}>Salvar</Button>
                            </div>
                        </div>
                    </form>
                </Dialog>
            </div>
        </div>        
    );
}

export default User;