import './header.css';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header>
            <Link className='logo' to="/"> <i className="pi pi-home" style={{ fontSize: '2rem'  }}></i> Educ Web</Link>
            <Link className='item' to="/student">Aluno |</Link>
            <Link className='item' to="/teacher">Professor |</Link>
            <Link className='item' to="/subject">Disciplina |</Link>

        </header>
    )
}

export default Header;