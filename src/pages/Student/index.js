import { useEffect, useState } from "react";
import api from "../../servicecs/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import { InputMask } from 'primereact/inputmask';
        

function Student(){

    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [visibleNovo, setVisibleNovo] = useState(false);
    const [studentSaveInput, setStudentSaveInput] = useState({
        name: '',
        bornDate: Date.now,
        phoneNumber: '',
        contact: {
            name: '',
            phone: '',
            email: ''
        },
        idClass: null
    });


    async function loadStudents(page, size){
        const response = await api.get("student", {
            params:{
                page: page,
                size: size
            }
        })
        console.log(response);
        setStudents(response.data.content);
     }

     useEffect(() => {
        loadStudents(currentPage, 10);
    }, [currentPage]);

    const onPageChange = event => {
        setCurrentPage(event.first / event.rows);
      };
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setStudentSaveInput((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }; 
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await api.post('student', studentSaveInput);
          loadStudents(0, 10);
        } catch (error) {
          console.error('Error:', error);
        }
      };  

    return(
        <div className="container">
            <div className="lista">
                <Button label="Novo" icon="pi pi-plus" onClick={() => setVisibleNovo(true)} className="link-new"/>
                 <DataTable value={students} paginator rows={10}  onPage={onPageChange} className="datatable-container">
                    <Column field="name" header="Nome"/>
                    <Column field="registration" header="Matricula"/>
                    <Column field="phoneNumber" header="Contato"/>
                    <Column field="studentClassName" header="Turma"/>
                    <Column field="studentClassShift" header="Turno"/>
                </DataTable>
                <Dialog header="Novo Aluno" visible={visibleNovo} onHide={() => setVisibleNovo(false)}>
                <form onSubmit={handleSubmit}>
                    <p>Nome</p>
                    <InputText value={studentSaveInput.name} type="text" name="name" onChange={handleChange} /><br/>
                    <p>Data de nascimento</p>
                    <Calendar value={studentSaveInput.bornDate} onChange={handleChange} />
                    <p>Telefone</p>
                    <InputMask id="phone" value={studentSaveInput.phoneNumber} mask="(99) 99999-9999" placeholder="(99) 99999-9999"/>
                    <Button type="submit" className="button-save" onClick={() => setVisibleNovo(false)}>Salvar</Button>
                </form>
            </Dialog>
            </div>

        </div>
    )
}

export default Student;