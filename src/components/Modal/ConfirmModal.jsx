import styles from "./ConfirmModal.module.css";
import X from "../../assets/ic_x.svg";
import ModalContainer from "./ModalContainer";

/**
 *
 * @param {string} type - 모달 타입
 * @param {string} description - 모달 안에 쓸 내용
 * @param {function} onClose - 닫는 함수
 * @param {function} onDelete - 삭제하는 함수
 * @param {function} onUpdate - 수정하는 함수
 * @param {function} setFail - 실패 여부
 */

export function ConfirmModal({
  type = "complete",
  description,
  onClose,
  onDelete,
  onUpdate,
  setFail,
}) {
  const modalType =
    type === "passwordFail" ? (
      <button className={styles.fail} onClick={handleCloseFailModal}>
        확인
      </button>
    ) : type === "deleteConfirm" ? (
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={onClose}>
          취소
        </button>
        <button className={styles.confirm} onClick={onDelete}>
          확인
        </button>
      </div>
    ) : type === "deleteConfirm" ? (
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={onClose}>
          취소
        </button>
        <button className={styles.confirm} onClick={onUpdate}>
          확인
        </button>
      </div>
    ) : (
      <button className={styles.complete} onClick={onClose}>
        확인
      </button>
    );

  const handleCloseFailModal = () => {
    setFail(false);
  };

  return (
    <ModalContainer>
      <div className={styles.content}>
        <img
          src={X}
          onClick={onClose}
          style={{ cursor: "pointer" }}
          alt="close btn"
        />
        <span>{description}</span>
        {modalType}
      </div>
    </ModalContainer>
  );
}
