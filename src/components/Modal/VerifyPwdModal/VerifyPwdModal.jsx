import { useState } from "react";
import styles from "./VerifyPwdModal.module.css";
import X from "../../../assets/ic_x.svg";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import ModalContainer from "../ModalContainer/ModalContainer";
import PasswordInput from "../../Common/Inputs/PasswordInput/PasswordInput";
import Button from "../../Common/Button/Button";
import InvestmentUpdate from "../../Investment/InvestmentUpdate";
import { useDeleteInvestment } from "../../../api/queries/investmentQuery";

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== storedPassword) {
      setFail(true);
      return;
    } else {
      setConfirm(true);
      setShowInvestmentUpdate(true);
    }
  };

  const deleteInvest = useDeleteInvestment(id);
  const confirmDelete = () => {
    deleteInvest.mutate(null, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <>
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
              onChange={(e) => setPassword(e.target.value)}
              onToggle={() => setIsPasswordVisible(!isPasswordVisible)}
              onKeyDown={handleKeyDown}
              isVisible={isPasswordVisible}
            />
          </div>
          <Button
            label={type === "delete" ? "삭제하기" : "수정하기"}
            onClick={handleSubmit}
          />
        </div>
      </ModalContainer>

      {fail && <ConfirmModal type="passwordFail" setFail={setFail} />}
      {type === "delete" && confirm && (
        <ConfirmModal
          type="deleteConfirm"
          onClose={() => setConfirm(false)}
          onDelete={confirmDelete}
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
    </>
  );
}
