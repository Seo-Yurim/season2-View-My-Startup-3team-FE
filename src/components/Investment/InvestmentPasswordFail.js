import styles from './InvestmentPasswordFail.module.css';
import X from '../../assets/ic_x.svg';
import Modal from '../Common/Modal';

export default function InvestmentPasswordFail({ setFail }) {
  const handleCloseFailModal = () => {
    setFail(false);
  };

  return (
    <Modal>
      <div className={styles.content}>
        <img
          src={X}
          onClick={handleCloseFailModal}
          style={{ cursor: 'pointer' }}
          alt="close btn"
        />
        <span>잘못된 비밀번호입니다.</span>
        <button className={styles.fail} onClick={handleCloseFailModal}>
          확인
        </button>
      </div>
    </Modal>
  );
}
