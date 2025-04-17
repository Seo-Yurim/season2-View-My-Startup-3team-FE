import styles from './Nav.module.css';
import siteLogo from '../../assets/img_logo_pc.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? '#ffffff' : '',
    fontWeight: isActive ? 700 : ''
  };
}

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

  const hanleLogoClick = () => {
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  }
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <img 
          className={styles.logo} 
          src={siteLogo} 
          onClick={hanleLogoClick}
          alt="View My Startup Logo" 
          style={{ cursor: 'pointer' }}
        />
        <ul className={styles.menu}>
          <li>
            <NavLink to="/my-comparison" style={getLinkStyle}>
              나의 기업 비교
            </NavLink>
          </li>
          <li>
            <NavLink to="/comparison" style={getLinkStyle}>
              비교 현황
            </NavLink>
          </li>
          <li>
            <NavLink to="/investment" style={getLinkStyle}>
              투자 현황
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
