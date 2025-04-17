import styles from "./ConfirmModal.module.css";
import X from "../../assets/ic_x.svg";
import ModalContainer from "./ModalContainer";
import Button from "../Common/Button/Button";
import { useNavigate } from "react-router-dom";

export default function ConfirmModal({
  type = "complete",
  onClose,
  onDelete,
  onUpdate,
  setFail,
  data,
}) {
  const modalType =
    type === "passwordFail" ? (
      <>
        <span>잘못된 비밀번호입니다.</span>
        <Button label="확인" onClick={handleCloseFailModal} />
      </>
    ) : type === "deleteConfirm" ? (
      <>
        <span>해당 정보를 삭제하시겠습니까?</span>
        <div className={styles.buttons}>
          <Button type="solid" label="취소" onClick={onClose} />
          <Button label="확인" onClick={onDelete} />
        </div>
      </>
    ) : type === "updateConfirm" ? (
      <>
        <span>수정하시겠습니까?</span>
        <div className={styles.buttons}>
          <Button type="solid" label="취소" onClick={onClose} />
          <Button label="확인" onClick={onUpdate} />
        </div>
      </>
    ) : (
      <>
        <span>투자가 완료되었어요!</span>
        <Button
          label="확인"
          onClick={
            data
              ? () => {
                  onClose();
                  handleRowClick(data.id);
                }
              : onClose
          }
        />
      </>
    );

  const handleCloseFailModal = () => {
    setFail(false);
  };

  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/startup/${id}`);
  };

  return (
    <ModalContainer>
      <div className={styles.content}>
        <img
          src={X}
          onClick={onClose}
          style={{ cursor: "pointer" }}
          alt="modal close"
        />
        {modalType}
      </div>
    </ModalContainer>
  );
}
