import { useNavigate } from "react-router-dom";
import styles from "./TableList.module.css";

export default function TableList({ tableData, list }) {
  const navigate = useNavigate();
  const emptyRowCount = Math.max(0, 10 - list.length);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {tableData?.map((head, idx) => (
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
              {tableData.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}

          {Array.from({ length: emptyRowCount }).map((_, idx) => (
            <tr
              key={`empty-${idx}`}
              style={{ visibility: "hidden", borderBottom: "none" }}
            >
              &nbsp;
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
