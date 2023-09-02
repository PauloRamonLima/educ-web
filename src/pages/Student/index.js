import { useEffect, useState, useRef } from "react";
import api from "../../servicecs/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Accordion, AccordionTab } from "primereact/accordion";

function Student() {

  const [students, setStudents] = useState([]);
  const [classList, setClassList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleNovo, setVisibleNovo] = useState(false);
  const [totStudent, setTotStudent] = useState(0);
  const StudentInputClear = {
    id: null,
    name: '',
    bornDate: '',
    phoneNumber: '',
    contact: {
      name: '',
      phone: '',
      email: ''
    },
    idClass: null
  };
  const [studentSaveInput, setStudentSaveInput] = useState(StudentInputClear);
  const toast = useRef(null);
  const [nameFilter, setNameFilter] = useState(null);
  const [registrationFilter, setRegistrationFilter] = useState(null);

  async function loadStudents(page, size) {
    const response = await api.get("student", {
      params: {
        page: page,
        size: size,
        name: nameFilter,
        registration: registrationFilter
      }
    });
    setTotStudent(response.data.totalElements);
    setStudents(response.data.content);
  }

  async function loadClass(){
    const response = await api.get("class")
    setClassList(response.data);
  }

  async function deleteStudent(){
    const response = await api.delete("student", {
      params: {
        id: studentSaveInput.id
      }
    });
    if(response.status === 200){
      showMessage('Aluno deletado com sucesso');
      loadStudents(0, 10);
      setStudentSaveInput(StudentInputClear);
    }
  }

  useEffect(() => {
    loadStudents(currentPage, 10);
    loadClass();
  }, [currentPage]);

  const onPageChange = event => {
    setCurrentPage(event.first / event.rows);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name.includes('.')) {
      const [parentProp, childProp] = name.split('.');
      setStudentSaveInput((prevData) => ({
        ...prevData,
        [parentProp]: {
          ...prevData[parentProp],
          [childProp]: value,
        },
      }));
    } else {
      setStudentSaveInput((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('student', studentSaveInput);
      if(response.status === 200){
        showMessage('Aluno Salvo com sucesso');
        loadStudents(0, 10);
        setStudentSaveInput(StudentInputClear);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function showMessage(message){
    toast.current.show({ severity: 'success', summary: 'Successo', detail: message, life: 6000 });
  };

  const footer = `Total: ${totStudent} Estudantes.`;

  const onSelectionChange = (event) => {
    const value = event.value;
    setStudentSaveInput(value);
  };

  const renderContact = rowData => {
    return <div>{rowData.contact.name} - {rowData.contact.email}</div>;
  };

  function filter(){
    loadStudents(0, 10);
  }

  return (
    <div className="container">
      <Toast ref={toast} />
      <h2>Alunos</h2>
      <div className="lista">

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
              <div class="field col-3">
                <label>Matricula:</label>   
                <InputText name="registrationFilter" value={registrationFilter} onChange={(e) => setRegistrationFilter(e.target.value)} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
              </div>
            </div>
            <Button  icon="pi pi-search" label="Pesquisar"  type="submit" />
           
            </form>
          </AccordionTab>
        </Accordion> 
        <br/>
        <Button label="Novo" icon="pi pi-plus" onClick={() => setVisibleNovo(true)} />
        <Button label="Alterar" severity="help" style={{ marginLeft: '8px' }} icon="pi pi-pencil" disabled={studentSaveInput.id === null} onClick={() => setVisibleNovo(true)} />
        <Button label="Deletar" severity="danger" style={{ marginLeft: '8px' }} icon="pi pi-trash" disabled={studentSaveInput.id === null} onClick={deleteStudent} />
 
        <DataTable value={students} paginator rows={10} onPage={onPageChange} className="datatable-container" footer={footer}
          selection={studentSaveInput} onSelectionChange={onSelectionChange} selectionMode="single">
          <Column selectionMode="single" headerStyle={{ width: '3rem' }} />
          <Column field="name" header="Nome" />
          <Column field="registration" header="Matricula" />
          <Column field="phoneNumber" header="Contato" />
          <Column field="studentClassName" header="Turma" />
          <Column field="studentClassShift" header="Turno" />
          <Column body={renderContact} header="Contato (Nome - Email)"/>
        </DataTable>

        <Dialog header="Aluno" visible={visibleNovo} onHide={() => setVisibleNovo(false)}>
          <form onSubmit={handleSubmit}>
            <div class="formgrid grid">
              <div class="field col-4">
                <label>Nome</label>
                <InputText value={studentSaveInput.name}  type="text" name="name" onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
              </div>
              <div class="field col-3">
                <label>Data de nascimento</label>
                <InputMask value={studentSaveInput.bornDate} name="bornDate" mask="99/99/9999" placeholder="99/99/9999" onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
              </div>
              <div class="field col-3">
                <label>Telefone</label>
                <InputMask id="phone" value={studentSaveInput.phoneNumber} name="phoneNumber" onChange={handleChange} mask="(99) 99999-9999" placeholder="(99) 99999-9999" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
              </div>
              <div class="field col-2">
                <label>Turma</label>
                <Dropdown value={studentSaveInput.idClass} name="idClass" optionValue="id" onChange={handleChange} options={classList} optionLabel={option => `${option.name} - ${option.shift}`}
                    placeholder="Selecione uma turma" className="w-full md:w-14rem" />
              </div>
              <div class="field col-4">
                <label>Contato Nome</label>
                <InputText value={studentSaveInput.contact.name} name="contact.name" type="text" onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
              </div>
              <div class="field col-3">
                <label>Contato Email</label>
                <InputText value={studentSaveInput.contact.email} name="contact.email" type="email" onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
              </div>
              <div class="field col-3">
                <label>Contato Telefone</label>
                <InputMask value={studentSaveInput.contact.phone} name="contact.phone" mask="(99) 99999-9999" placeholder="(99) 99999-9999" onChange={handleChange} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
              </div>
            </div>
            <Button type="submit" onClick={() => setVisibleNovo(false)}>Salvar</Button>
          </form>
        </Dialog>
      </div>

    </div>
  )
}

export default Student;