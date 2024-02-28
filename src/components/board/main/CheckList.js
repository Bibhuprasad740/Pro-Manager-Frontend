import classes from "./CheckList.module.css";

const CheckList = ({ data, onToggleCheck }) => {
  return (
    <div className={classes.checklist}>
      <input
        className={classes.checkbox}
        type="checkbox"
        checked={data.checked}
        onChange={() => onToggleCheck(data)}
      />
      <p className={classes.content}>{data.content}</p>
    </div>
  );
};

export default CheckList;
