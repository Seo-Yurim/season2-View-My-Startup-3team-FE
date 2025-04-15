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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
