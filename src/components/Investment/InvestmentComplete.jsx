import styles from "./InvestmentComplete.module.css";
import X from "../../assets/ic_x.svg";
import ModalContainer from "../Common/Modal/ModalContainer";

export default function InvestmentComplete({ onClose }) {
  return (
    <ModalContainer>
      <div className={styles.content}>
        <img
          src={X}
          onClick={onClose}
          style={{ cursor: "pointer" }}
          alt="close btn"
        />
        <span>투자가 완료되었어요!</span>
        <button className={styles.complete} onClick={onClose}>
          확인
        </button>
      </div>
    </ModalContainer>
  );
}
