import styles from './StartupDetailDropdown.module.css';

export default function DropdownMenu({ onPatch, onDelete }) {
  return (
    <ul className={styles.menu}>
      <li onClick={onPatch}>수정하기</li>
      <li onClick={onDelete}>삭제하기</li>
    </ul>
  );
}
