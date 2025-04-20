import { useState } from "react";
import styles from "./VerifyPwdModal.module.css";
import X from "../../../assets/ic_x.svg";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import ModalContainer from "../ModalContainer/ModalContainer";
import PasswordInput from "../../Common/Inputs/PasswordInput/PasswordInput";
import Button from "../../Common/Button/Button";
import InvestmentUpdate from "../../Investment/InvestmentUpdate";
import { deleteInvestment } from "../../../api/InvestmentService";

export default function VerifyPwdModal({
  type,
  label,
  onClose,
  startup,
  mockInvestor,
}) {
  const { id, password: storedPassword } = mockInvestor || {};

  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showInvestmentUpdate, setShowInvestmentUpdate] = useState(false);
  const [fail, setFail] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== storedPassword) {
      setFail(true);
      return;
    } else {
      setConfirm(true);
      setShowInvestmentUpdate(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteInvestment(id, { password });
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("삭제 요청 중 오류 발생:", err);
      console.error(err.response.data);
    }
  };

  return (
    <ModalContainer>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>{label}</h1>
          <img
            src={X}
            onClick={onClose}
            style={{ cursor: "pointer" }}
            alt="close btn"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className={styles.group}>
          <PasswordInput
            label="비밀번호"
            id="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={handleChange}
            onToggle={togglePasswordVisibility}
            onKeyDown={handleKeyDown}
            isVisible={isPasswordVisible}
          />
        </div>
        <Button
          label={type === "delete" ? "삭제하기" : "수정하기"}
          onClick={handleSubmit}
        />
      </div>

      {fail && <ConfirmModal type="passwordFail" setFail={setFail} />}
      {type === "delete" && confirm && (
        <ConfirmModal
          type="deleteConfirm"
          onDelete={confirmDelete}
          onClose={() => setConfirm(false)}
        />
      )}

      {type === "update" && showInvestmentUpdate && (
        <InvestmentUpdate
          onClose={() => {
            setShowInvestmentUpdate(false);
            onClose();
          }}
          startup={startup}
          mockInvestor={mockInvestor}
          initialValues={{
            name: mockInvestor.name,
            investAmount: mockInvestor.investAmount,
            comment: mockInvestor.comment,
            password: mockInvestor.password,
          }}
        />
      )}
    </ModalContainer>
  );
}
