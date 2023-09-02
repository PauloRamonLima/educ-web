import './header.css';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header>
            <Link className='logo' to="/"> <i className="pi pi-home" style={{ fontSize: '2rem'  }}></i> Educ Web</Link>
            <Link className='item' to="/student"><i className="pi pi-user" style={{ fontSize: '1.0rem' }}></i> Alunos |</Link>
            <Link className='item' to="/teacher"><i className="pi pi-user-edit" style={{ fontSize: '1.2rem' }}></i> Professores |</Link>
            <Link className='item' to="/class"><i className="pi pi-sitemap" style={{ fontSize: '1.0rem', marginTop: '5px' }}></i> Turmas |</Link>
            <Link className='item' to="/subject"><i className="pi pi-book" style={{ fontSize: '1.0rem', marginTop: '6px' }}></i> Disciplinas |</Link>

        </header>
    )
}

export default Header;