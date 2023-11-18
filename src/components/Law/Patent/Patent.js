import Law from "../Law/Law";

const Patent = () => {
  return (
    <div>
      <Law title={title} text={text} />
    </div>
  );
};

export default Patent;

const title = "特許関連情報";
const text = `特願2023-89942`;
