import { useEffect, useState, useRef } from "react";
import api from "../../servicecs/api";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { InputMask } from "primereact/inputmask";
import { Accordion, AccordionTab } from "primereact/accordion";

function Teacher(){

    const [teachers, setTeachers] = useState([]);
    const [totTeacher, setTotTeacher] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [visibleNovo, setVisibleNovo] = useState(false);
    const toast = useRef(null);
    const teacherInputClear = {
        id: null,
        name: '',
        cpf: '',
        bornDate: '',
        phoneNumber: '',
    }
    const [teacherInput, setTeacherInput] = useState(teacherInputClear);
    const [nameFilter, setNameFilter] = useState(null);
    const [cpfFilter, setCpfFilter] = useState(null);

    async function loadTeacher(page, size) {
        const response = await api.get("teacher", {
          params: {
            page: page,
            size: size,
            name: nameFilter,
            cpf: cpfFilter
          }
        });
        setTotTeacher(response.data.totalElements);
        setTeachers(response.data.content);
      }

      useEffect(() => {
        loadTeacher(currentPage, 10);
      }, [currentPage]);
    
      const footer = `Total: ${totTeacher} Professores.`;

      const onPageChange = event => {
        setCurrentPage(event.first / event.rows);
      };

      async function deleteTeacher(){
        const response = await api.delete("teacher", {
          params: {
            id: teacherInput.id
          }
        });
      }

      const onSelectionChange = (event) => {
        const value = event.value;
        setTeacherInput(value);
      };

      const handleChange = (event) => {
        const { name, value } = event.target;
        setTeacherInput((prevData) => ({
            ...prevData,
            [name]: value,
          }));
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await api.post('teacher', teacherInput);
          if(response.status === 200){
            showMessage();
            loadTeacher(0, 10);
            setTeacherInput(teacherInputClear);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      function showMessage(){
        toast.current.show({ severity: 'success', summary: 'Successo', detail: 'Professor Salvo com sucesso', life: 6000 });
      };

      function filter(){
        loadTeacher(0, 10);
      }

    return(
        <div className="container">
            <div className="lista">
                <Toast ref={toast}/>
                <h2>Professor</h2>
                
                <Accordion>
          <AccordionTab header="Parâmetros de pesquisa">
          <form onSubmit={(e) => {
                                  e.preventDefault();
                                  filter();
                                }}>
            <div class="formgrid grid">
              <div class="field col-4">
                <label>Nome:</label>   
                <InputText name="nameFilter" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
              </div>
              <div class="field col-2">
                <label>CPF:</label>   
                <InputMask id="cpf" value={cpfFilter} name="cpfFilter" onChange={(e) => setCpfFilter(e.target.value)} mask="999.999.999-99" placeholder="999.999.999-99" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
              </div>
            </div>
            <Button  icon="pi pi-search" label="Pesquisar"  type="submit" />
           
            </form>
          </AccordionTab>
        </Accordion> 
        <br/>

                <Button label="Novo" icon="pi pi-plus" onClick={() => setVisibleNovo(true)} />
                <Button label="Alterar" severity="help" style={{ marginLeft: '8px' }} icon="pi pi-pencil" disabled={teacherInput.id === null} onClick={() => setVisibleNovo(true)} />
                <Button label="Deletar" severity="danger" style={{ marginLeft: '8px' }} icon="pi pi-trash" disabled={teacherInput.id === null} onClick={deleteTeacher} />


                <DataTable value={teachers} paginator rows={10} onPage={onPageChange} className="datatable-container" footer={footer}
                    selection={teacherInput} onSelectionChange={onSelectionChange} selectionMode="single">
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} />
                    <Column field="name" header="Nome" />
                    <Column field="cpf" header="CPF" />
                    <Column field="phoneNumber" header="Contato" />
                    <Column field="bornDate" header="Data nascimento" />
                </DataTable>

                <Dialog header="Professor" visible={visibleNovo} onHide={() => setVisibleNovo(false)}>
                    <form onSubmit={handleSubmit}>
                        <div class="formgrid grid">
                            <div class="field col-12">
                                <label>Nome</label>
                                <InputText value={teacherInput.name}  type="text" name="name" onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                            </div>
                            <div class="field col-3">
                                <label>CPF</label>
                                <InputMask id="cpf" value={teacherInput.cpf} name="cpf" onChange={handleChange} mask="999.999.999-99" placeholder="999.999.999-99" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                            </div>
                            <div class="field col-3">
                                <label>Telefone</label>
                                <InputMask id="phone" value={teacherInput.phoneNumber} name="phoneNumber" onChange={handleChange} mask="(99) 99999-9999" placeholder="(99) 99999-9999" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                            </div>
                            <div class="field col-3">
                                <label>Data de Nascimento</label>
                                <InputMask id="phone" value={teacherInput.bornDate} name="bornDate" onChange={handleChange} mask="99/99/9999" placeholder="99/99/9999" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                            </div>
                            <div class="field col-3"></div>
                            <Button type="submit" onClick={() => setVisibleNovo(false)}>Salvar</Button>
                        </div>    
                    </form>
                </Dialog>
            </div>
        </div>        
    )
}

export default Teacher;