import styles from "./InvestorList.module.css";
import kebab from "../../assets/ic_kebab.svg";
import { useState, useEffect, useRef } from "react";
import { formatAmount } from "../../utils/formatAmount";
import CreateInvestModal from "../Modal/CreateInvestModal/CreateInvestModal";
import StartupDetailDropdown from "./StartupDetailDropdown";
import VerifyPwdModal from "../Modal/VerifyPwdModal/VerifyPwdModal";
import Button from "../Common/Button/Button";

export default function InvestorList({ startup, investors }) {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isPatchModalOpen, setPatchModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleMenuClick = (investor) => {
    setSelectedInvestor(investor);
    setDropdownOpen((prev) => !prev);
  };

  const handleDropdownOptionClick = (action) => {
    setDropdownOpen(false);
    if (action === "patch") {
      setPatchModalOpen(true);
    } else if (action === "delete") {
      setDeleteModalOpen(true);
    }
  };

  return (
    <section className={styles.wrap}>
      <div className={styles.title}>
        <p>View My Startup에서 받은 투자</p>
        <Button
          width="auto"
          label="기업 투자하기"
          onClick={() => setCreateModalOpen(true)}
        />
      </div>

      <div className={styles[`list-wrap`]}>
        <p className={styles.amount}>총 {formatAmount(startup.simInvest)}원</p>
        <div className={styles[`table-wrap`]}>
          {investors.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: "8.4rem" }}>투자자 이름</th>
                  <th style={{ width: "8.4rem" }}>순위</th>
                  <th style={{ width: "8.4rem" }}>투자 금액</th>
                  <th style={{ width: "auto" }}>투자 코멘트</th>
                  <th style={{ width: "6.4rem" }}> </th>
                </tr>
              </thead>

              <tbody>
                {investors.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.rank}위</td>
                    <td>{formatAmount(item.investAmount)} 원</td>
                    <td style={{ textAlign: "left" }}>{item.comment}</td>
                    <td style={{ position: "relative" }}>
                      <img
                        src={kebab}
                        alt="더보기 아이콘"
                        onClick={() => handleMenuClick(item)}
                        style={{ cursor: "pointer" }}
                      />
                      {selectedInvestor?.id === item.id && dropdownOpen && (
                        <div ref={dropdownRef}>
                          <StartupDetailDropdown
                            onPatch={() => handleDropdownOptionClick("patch")}
                            onDelete={() => handleDropdownOptionClick("delete")}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.null}>
              아직 투자한 기업이 없어요,
              <br />
              버튼을 눌러 기업에 투자해보세요!
            </div>
          )}
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateInvestModal
          onClose={() => setCreateModalOpen(false)}
          startup={startup}
        />
      )}
      {isPatchModalOpen && selectedInvestor && (
        <VerifyPwdModal
          type="update"
          label="수정 권한 인증"
          onClose={() => setPatchModalOpen(false)}
          startup={startup}
          mockInvestor={selectedInvestor}
        />
      )}
      {isDeleteModalOpen && selectedInvestor && (
        <VerifyPwdModal
          type="delete"
          label="삭제 권한 인증"
          onClose={() => setDeleteModalOpen(false)}
          mockInvestor={selectedInvestor}
        />
      )}
    </section>
  );
}
