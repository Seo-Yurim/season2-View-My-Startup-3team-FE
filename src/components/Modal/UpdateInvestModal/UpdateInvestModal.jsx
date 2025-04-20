import styles from "./UpdateInvestModal.module.css";
import X from "../../../assets/ic_x.svg";
import { useState } from "react";
import useValidate from "../../../hooks/useValidate";
import ModalContainer from "../ModalContainer/ModalContainer";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Input from "../../Common/Inputs/Input/Input";
import PasswordInput from "../../Common/Inputs/PasswordInput/PasswordInput";
import Button from "../../Common/Button/Button";
import TextArea from "../../Common/Inputs/TextArea/TextArea";
import { usePatchInvestment } from "../../../api/queries/investmentQuery";

export default function UpdateInvestModal({
  onClose,
  startup,
  investorId,
  initialValues,
}) {
  const { image, name, categoryName } = startup || {};
  const {
    values,
    errors,
    handleChange,
    validate,
    handleBlur,
    getRawValues,
    isInputEmpty,
  } = useValidate({
    name: initialValues?.name || "",
    investAmount: initialValues?.investAmount || "",
    comment: initialValues?.comment || "",
    password: initialValues?.password || "",
    checkPassword: "",
  });

  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setConfirm(true);
  };

  const updateInvest = usePatchInvestment(investorId);
  const handleSubmit = () => {
    const rawValues = getRawValues();
    const investAmount = parseFloat(rawValues.investAmount);
    const investment = { ...rawValues, investAmount };
    delete investment.checkPassword;

    updateInvest.mutate(investment, {
      onSuccess: () => {
        setConfirm(false);
        onClose();
      },
      onError: () => {
        setError("투자 수정 중 오류가 발생했습니다.");
      },
    });
  };

  return (
    <ModalContainer>
      <form className={styles.form} onSubmit={handleUpdateSubmit}>
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
      {confirm && (
        <ConfirmModal
          type="updateConfirm"
          onUpdate={handleSubmit}
          onClose={() => setConfirm(false)}
        />
      )}
    </ModalContainer>
  );
}
