import styles from "./InvestmentDeleteConfirm.module.css";
import X from "../../assets/ic_x.svg";
import ModalContainer from "../Common/Modal/ModalContainer";

export default function InvestmentDeleteConfirm({ onDelete, onClose }) {
  return (
    <ModalContainer>
      <div className={styles.content}>
        <img
          src={X}
          onClick={onClose}
          style={{ cursor: "pointer" }}
          alt="close btn"
        />
        <span>해당 정보를 삭제하시겠습니까?</span>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>
            취소
          </button>
          <button className={styles.confirm} onClick={onDelete}>
            확인
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}
