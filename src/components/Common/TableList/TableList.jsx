import { useNavigate } from "react-router-dom";
import styles from "./TableList.module.css";

export default function TableList({
  tableData,
  list,
  pageSize = 10,
  isEmpty = true,
  startupId,
}) {
  const navigate = useNavigate();
  const emptyRowCount = Math.max(0, pageSize - list.length);

  return (
    <section className={styles.wrapper}>
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
              onClick={() =>
                navigate(`/startup/${item.startup ? item.startup.id : item.id}`)
              }
              style={{ cursor: "pointer" }}
              className={startupId === item.id ? styles.selected : ""}
            >
              {tableData.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {isEmpty &&
            Array.from({ length: emptyRowCount }).map((_, idx) => (
              <tr
                key={`empty-${idx}`}
                style={{ visibility: "hidden", borderBottom: "none" }}
              >
                {tableData.map((_, i) => (
                  <td key={i}>&nbsp;</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
