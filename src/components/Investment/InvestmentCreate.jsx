import styles from "./InvestmentCreate.module.css";
import X from "../../assets/ic_x.svg";
import { useState } from "react";
import useValidate from "../../hooks/useValidate";
import ModalContainer from "../Modal/ModalContainer/ModalContainer";
import ConfirmModal from "../Modal/ConfirmModal/ConfirmModal";
import Input from "../Common/Inputs/Input/Input";
import TextArea from "../Common/Inputs/TextArea/TextArea";
import PasswordInput from "../Common/Inputs/PasswordInput/PasswordInput";
import Button from "../Common/Button/Button";
import { useCreateInvestment } from "../../api/queries/investmentQuery";

export default function InvestmentCreate({ onClose, startup, setCurrentPage }) {
  const { id: startupId, image, name, categoryName } = startup || {};
  const {
    values,
    errors,
    handleChange,
    validate,
    handleBlur,
    getRawValues,
    isInputEmpty,
  } = useValidate({
    name: "",
    investAmount: "",
    comment: "",
    password: "",
    checkPassword: "",
  });
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const createInvest = useCreateInvestment(startupId);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const rawValues = getRawValues();
    const investAmount = parseFloat(rawValues.investAmount);

    const investData = {
      ...rawValues,
      investAmount,
      startupId,
    };
    delete investData.checkPassword;

    createInvest.mutate(investData, {
      onSuccess: () => {
        setIsComplete(true);
        setCurrentPage(1);
      },
      onError: () => {
        setError("투자에 실패하였습니다.");
      },
    });
  };

  const handleCloseCompleteModal = () => {
    setIsComplete(false);
    onClose();
  };

  return (
    <ModalContainer>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles[`form-header`]}>
          <h1>기업에 투자하기</h1>
          <img
            src={X}
            onClick={onClose}
            style={{ cursor: "pointer" }}
            alt="close btn"
          />
        </div>
        <div className={styles[`startup-info`]}>
          <label>투자 기업 정보</label>
          <div className={styles.startup}>
            <img src={image} alt={name} />
            <p className={styles.name}>{name}</p>
            <p className={styles.category}>{categoryName}</p>
          </div>
        </div>

        {/* 투자자 이름 */}
        <div className={styles.group}>
          <Input
            label="투자자 이름"
            type="text"
            id="name"
            placeholder="투자자 이름을 입력해 주세요"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
          />
        </div>

        {/* 투자 금액 */}
        <div className={styles.group}>
          <Input
            label="투자 금액"
            type="text"
            id="investAmount"
            placeholder="투자 금액을 입력해 주세요"
            value={values.investAmount}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.investAmount}
          />
        </div>

        {/* 투자 코멘트 */}
        <div className={styles.group}>
          <TextArea
            label="투자 코멘트"
            id="comment"
            placeholder="투자에 대한 코멘트를 입력해 주세요"
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.comment}
          />
        </div>

        {/* 비밀번호 */}
        <div className={styles.group}>
          <PasswordInput
            label="비밀번호"
            id="password"
            placeholder="비밀번호를 입력해 주세요"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className={styles.group}>
          <PasswordInput
            label="비밀번호 확인"
            id="checkPassword"
            placeholder="비밀번호를 입력해 주세요"
            value={values.checkPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.checkPassword}
          />
        </div>

        <div className={styles.buttons}>
          <Button styleType="solid" label="취소" onClick={onClose} />
          <Button type="submit" label="확인" isDisabled={isInputEmpty()} />
        </div>
        {error && <div className="form-error">{error}</div>}
      </form>
      {isComplete && <ConfirmModal onClose={handleCloseCompleteModal} />}
    </ModalContainer>
  );
}
