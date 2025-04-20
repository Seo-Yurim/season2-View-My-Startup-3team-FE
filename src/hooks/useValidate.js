import { useState } from 'react';

export default function useValidate(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const formatAmount = (value) => {
    const numericValue = value.replace(/,/g, '');
    return !isNaN(numericValue) && numericValue !== ''
      ? Number(numericValue).toLocaleString()
      : value;
  };

  const validate = () => {
    let isValid = true;
    let newError = {};

    if (!values.name || values.name.length < 1 || values.name.length > 10) {
      isValid = false;
      newError.name = '10자 이내로 입력해주세요.';
    }

    if (!values.comment || values.comment.length < 10) {
      isValid = false;
      newError.comment = '10자 이상 입력해주세요.';
    } else if (!values.comment || values.comment.length > 100) {
      isValid = false;
      newError.comment = '100자 이내로 입력해주세요.';
    }

    const investAmount = values.investAmount.replace(/,/g, '');
    if (!investAmount || isNaN(investAmount)) {
      isValid = false;
      newError.investAmount = '숫자로 입력해주세요.';
    }

    if (!values.password || values.password.length < 6) {
      isValid = false;
      newError.password = '6자 이상 입력해주세요.';
    }

    if (!values.checkPassword || !(values.password === values.checkPassword)) {
      isValid = false;
      newError.checkPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newError);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'investAmount') {
      const formattedValue = formatAmount(value);
      setValues({
        ...values,
        [id]: formattedValue
      });
    } else {
      setValues({
        ...values,
        [id]: value
      });
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: ''
    }));
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    let newError = {};

    if (!values[id] || values[id].trim() === '') {
      newError[id] = '* 필수 입력 항목입니다.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: newError[id] || ''
    }));
  };

  const getRawValues = () => {
    return {
      ...values,
      investAmount: values.investAmount.replace(/,/g, '')
    };
  };

  const isInputEmpty = () => {
    return (
      values.name.trim() === '' ||
      values.investAmount.trim() === '' ||
      values.comment.trim() === '' ||
      values.password.trim() === '' ||
      values.checkPassword.trim() === ''
    );
  };

  return {
    values,
    errors,
    validate,
    handleChange,
    handleBlur,
    getRawValues,
    isInputEmpty
  };
}
