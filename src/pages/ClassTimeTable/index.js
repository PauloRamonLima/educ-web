import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import api from "../../servicecs/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputMask } from "primereact/inputmask";

function ClassTimeTable() {

    const [classTimeTables, setClassTimeTables] = useState([]);
    const [classList, setClassList] = useState([]);
    const [id, setId] = useState(null);
    const [visibleNovo, setVisibleNovo] = useState(false);
    const classTimeTableClear = {
        time: '',
        dayOfWeek: '',
        subjectId: null,
        teacherId: null,
        classTimeTableId: null,
    };
    const [classTimeTableInput, setClassTimeTableInput] = useState(classTimeTableClear);

    async function loadClass(){
        const response = await api.get("class")
        setClassList(response.data);
    }

    async function loadClassTimeTableByClass(event){
    event.preventDefault();
    setId(event.value);
    console.log(id);
    const response = await api.get("class-time-table", {
            params: {
                idClass: id
            }
        });
        setClassTimeTables(response.data);
    }

    useEffect(() => {
        loadClass()
    }, []);
    
    return (
        <div className="container">
            <div className="lista">
                <h2>Aulas</h2>

                <Button label="Novo" icon="pi pi-plus" onClick={() => setVisibleNovo(true)} /> <br/>

                <Dropdown value={id} name="idClass" optionValue="id" onChange={loadClassTimeTableByClass} options={classList} optionLabel={option => `${option.name} - ${option.shift}`}
                    placeholder="Selecione uma turma" className="w-full md:w-14rem dropdownTimeTable" />

                <DataTable value={classTimeTables} className="datatable-container">
                    <Column field="dayOfWeek" header="Dia" />
                    <Column field="time" header="Horário" />
                    <Column field="subjectName" header="Materia" />
                    <Column field="teacherName" header="Professor(a)"/>
                    <Column field="classTimeTableName" header="Turma" />
                </DataTable>

                <Dialog header="Cronograma" visible={visibleNovo} onHide={() => setVisibleNovo(false)}>
                    <label>Horário</label>
                    <InputMask mask="99:99 - 99:99" />
                </Dialog>
            </div>
        </div>
    )
}

export default ClassTimeTable;