import styles from "./InvestmentPatch.module.css";
import X from "../../assets/ic_x.svg";
import visibilityOff from "../../assets/btn_visibility_on.svg";
import visibilityOn from "../../assets/btn_visibility_off.svg";
import ModalContainer from "../Modal/ModalContainer";
import { useState, useRef, useEffect } from "react";
import InvestmentUpdate from "./InvestmentUpdate";
import ConfirmModal from "../Modal/ConfirmModal";

export default function InvestmentPatch({ onClose, mockInvestor, startup }) {
  const { password: storedPassword } = mockInvestor || {};
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showInvestmentUpdate, setShowInvestmentUpdate] = useState(false);
  const [fail, setFail] = useState(false);
  const passwordInputRef = useRef(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (password !== storedPassword) {
      setFail(true);
      return;
    } else {
      setShowInvestmentUpdate(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePasswordSubmit(e);
    }
  };

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <ModalContainer>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>수정 권한 인증</h1>
            <img
              src={X}
              onClick={onClose}
              style={{ cursor: "pointer" }}
              alt="close btn"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className={styles.group}>
            <h1>비밀번호</h1>
            <div className={styles.password}>
              <input
                ref={passwordInputRef}
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <img
                src={isPasswordVisible ? visibilityOff : visibilityOn}
                alt={isPasswordVisible ? "비밀번호 표시" : "비밀번호 숨기기"}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <button className={styles.patch} onClick={handlePasswordSubmit}>
            수정하기
          </button>
        </div>
      </ModalContainer>

      {fail && <ConfirmModal type="passwordFail" setFail={setFail} />}

      {showInvestmentUpdate && (
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
    </div>
  );
}
