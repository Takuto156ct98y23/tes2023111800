import CardUser from "../../Card/CardUser/CardUser";
import classes from "./ContentUsers.module.css";

const ContentUsers = (props) => {
  const users = props.users;

  return (
    <div className={classes.ContentUsers}>
      {/* {props.name} */}
      {users.map((userObj) => {
        return <CardUser key={userObj._id} obj={userObj} />;
      })}
    </div>
  );
};

export default ContentUsers;
