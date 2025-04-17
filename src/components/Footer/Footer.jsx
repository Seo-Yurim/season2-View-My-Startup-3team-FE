import styles from './Footer.module.css';
import siteLogo from '../../assets/img_logo_pc.svg'; // 로고 이미지가 Nav와 동일한 경우

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img 
          className={styles.logo} 
          src={siteLogo} 
          alt="View My Startup Logo" 
        />
        <ul className={styles.menu}>
          <li>
            <a href="/about">프로젝트 소개</a>
          </li>
          <li>
            <a href="/terms">이용약관</a>
          </li>
          <li>
            <a href="/privacy">개인정보 처리방침</a>
          </li>
        </ul>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} View My Startup. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
