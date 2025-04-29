import styles from "./Nav.module.css";
import siteLogo from "../../assets/img_logo_pc.svg";
import mobileMenu from "../../assets/ic_menu_md.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOopen, setDropdownOpen] = useState(false);

  const hanleLogoClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <div className={styles.images}>
          <img
            className={styles.logo}
            src={siteLogo}
            onClick={hanleLogoClick}
            fetchpriority="high"
            alt="View My Startup Logo"
          />
          <img
            className={styles[`mobile-menu`]}
            src={mobileMenu}
            onClick={() => setDropdownOpen((prev) => !prev)}
            loading="lazy"
            alt="mobile menu"
          />
        </div>

        <nav className={`${styles.nav} ${dropdownOopen ? styles.show : ""}`}>
          <ul className={styles.menu}>
            <li>
              <NavLink
                to="/startup"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setDropdownOpen(false)}
              >
                전체 스타트업 목록
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-comparison"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setDropdownOpen(false)}
              >
                나의 기업 비교
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/comparison"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setDropdownOpen(false)}
              >
                비교 현황
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/investment"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setDropdownOpen(false)}
              >
                투자 현황
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
