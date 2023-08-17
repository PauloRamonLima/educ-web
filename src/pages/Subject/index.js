import { useEffect, useState } from "react";
import api from "../../servicecs/api";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';        

function Subject(){

    const [subjects, setSubjects] = useState([]);
    const [visibleNovo, setVisibleNovo] = useState(false);
    const [subjectSaveInput, setSubjectSaveInput] = useState({
        name: ''
    });

    async function loadSubjects(){
        const response = await api.get("subject")
        setSubjects(response.data);
     }

    useEffect(() => {
        loadSubjects();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSubjectSaveInput((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await api.post('subject', subjectSaveInput);
          loadSubjects();
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
    return(
        <div className="container">
            <div className="lista">
                <Button label="Novo" icon="pi pi-plus" onClick={() => setVisibleNovo(true)} className="link-new"/>
                <DataTable value={subjects} className="datatable-container">
                    <Column field="name" header="Nome"/>
                </DataTable>
            </div>
            <Dialog header="Nova Disciplina" visible={visibleNovo} onHide={() => setVisibleNovo(false)}>
                <form onSubmit={handleSubmit}>
                    <p>Nome</p>
                    <InputText value={subjectSaveInput.name} type="text" name="name" onChange={handleChange} /><br/>
                    <Button type="submit" className="button-save" onClick={() => setVisibleNovo(false)}>Salvar</Button>
                </form>
            </Dialog>
        </div>
    )
}

export default Subject;