import styles from './StartupDetailHeader.module.css';
import noImageIcon from '../../assets/no-image.png';
import useFetchStartup from '../../hooks/useFetchStartupDetail';
import Warn from '../Common/Warning/Warn';
import { useParams } from 'react-router-dom';

export default function StartupDetailHeader() {
  const { id } = useParams();
  const { startup, error, showLoading } = useFetchStartup(id);

  if (error) {
    return <Warn variant="error" title="오류발생" description={error} />;
  }

  if (showLoading) {
    return <div>목록을 불러오는 중입니다....</div>;
  }

  if (!startup) {
    return;
  }

  return (
    <div className={styles.header}>
      <div className={styles.logoBox}>
        <img
          className={styles.logo}
          src={startup.startup.image || noImageIcon}
          alt=" 로고"
        />
        <div className={styles.startup}>
          <h1>{startup.startup.name}</h1>
          <h2>{startup.startup.categoryName}</h2>
        </div>
      </div>
    </div>
  );
}
