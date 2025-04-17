import styles from './StartupDetailInfo.module.css';
import { formatAmount } from '../../utils/formatAmount';
import useFetchStartup from '../../hooks/useFetchStartupDetail';
import Warn from '../Common/Warning/Warn';
import { useParams } from 'react-router-dom';

export default function StartupDetailInfo() {
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
    <>
      <div className={styles.body}>
        <div className={styles.infos}>
          <div className={styles.info}>
            <p>누적 투자 금액</p>
            <h1>{formatAmount(startup.startup.simInvest)} 원</h1>
          </div>
          <div className={styles.info}>
            <p>매출액</p>
            <h1>{formatAmount(startup.startup.revenue)} 원</h1>
          </div>
          <div className={styles.info}>
            <p>고용 인원</p>
            <h1>{formatAmount(startup.startup.employees)}명</h1>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.description}>
            <h1>기업 소개</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: startup.startup.description.replace(/\n/g, '<br />')
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
