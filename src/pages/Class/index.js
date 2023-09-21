import { useEffect, useState, useRef } from "react";
import api from "../../servicecs/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

function Class(){

    const [classList, setClassList] = useState([]);
    const [studentClassList, setStudentClassList] = useState([]);

    async function loadClass(){
        const response = await api.get("class")
        setClassList(response.data);
    }

    const loadStudentClass = async (id) => {
        try {
          const response = await api.get("class/students", {
            params: {
              idClass: id,
            },
          });
          setStudentClassList(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
    useEffect(() => {
        loadClass();
    }, []);

    const showStudentsClass = rowData => {
        return <div><Button icon="pi pi-user" onClick={() => loadStudentClass(rowData.id)} link /></div>
    }
    
    return(
       
        <div className="container">
            <div className="lista">
                <h2>Turma</h2>
                <div class="formgrid grid">
                    <div class="field col-4">
                <DataTable value={classList} className="datatable-container" selectionMode="single">
                  <Column field="name" header="Nome" />
                  <Column field="shift" header="Turno" />
                  <Column field="numberVacancies" header="Vagas" />
                  <Column header="Alunos" body={showStudentsClass}/>
                </DataTable>
                </div>
                <div class="field col-1"></div>
                <div class="field col-4">
                {studentClassList && studentClassList.length > 0 ? (
                  <DataTable value={studentClassList} className="datatable-container" header="Alunos">
                    <Column field="name" header="Nome" />
                    <Column field="registration" header="Matricula" />
                  </DataTable>
                  )  : (
                      <div></div>
                  )}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Class;