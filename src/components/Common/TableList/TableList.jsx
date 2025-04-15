import { useNavigate } from "react-router-dom";
import styles from "./TableList.module.css";

export default function TableList({ tableHead, list }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableHead?.map((head, idx) => (
                <th key={idx} style={{ width: `${head.width}` }}>
                  {head.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr
                key={item.id}
                onClick={() => navigate(`/startup/${item?.startup.id}`)}
                style={{ cursor: "pointer" }}
              >
                {tableHead.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
                {/* <td>{item.rank}위</td>
                <td>
                  <div className={styles.name}>
                    <img
                      src={item.startup.image || noImageIcon}
                      alt={item.startup.name}
                    />
                    {item.startup.name}
                  </div>
                </td>
                <td className={styles.description}>
                  {item.startup.description}
                </td>
                <td>{item.startup.categoryName}</td>
                <td>{formatAmount(item.startup.simInvest)} 원</td>
                <td>{formatAmount(item.startup.actualInvest)} 원</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
