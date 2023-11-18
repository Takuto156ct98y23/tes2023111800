import useSearchBox from "../../../../hooks/UI/useSearchBox";
import classes from "./CardSearchUser.module.css";

const CardSearchUser = () => {
  const { SearchBoxDropdown } = useSearchBox({
    path: "users/search",
    makeSelectArea: false,
    placeholder: "ユーザー名を入力して下さい。",
  });
  return (
    <div className={classes.CardSearchUser}>
      <h5>ユーザーを検索</h5>
      <div>{SearchBoxDropdown}</div>
    </div>
  );
};

export default CardSearchUser;
