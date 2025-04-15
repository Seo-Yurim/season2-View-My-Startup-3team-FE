import styles from '../Investment/InvestmentComplete.module.css';
import X from '../../assets/ic_x.svg';
import Modal from '../Common/Modal/Modal';
import { useNavigate } from 'react-router-dom';

export default function InvestmentComplete({ onClose, startup }) {
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/startup/${id}`);
  };
  return (
    <Modal>
      <div className={styles.content}>
        <img
          src={X}
          onClick={onClose}
          style={{ cursor: 'pointer' }}
          alt="close btn"
        />
        <span>투자가 완료되었어요!</span>
        <button
          className={styles.complete}
          onClick={() => {
            onClose();
            handleRowClick(startup.id);
          }}
        >
          확인
        </button>
      </div>
    </Modal>
  );
}
