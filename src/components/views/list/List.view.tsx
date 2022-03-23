import { useFakeApi } from "hooks";

const ListView = () => {
  const list = useFakeApi();
  return (
    <div>
      {list.map(({ title, body }) => (
        <div key={title}>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
};

export default ListView;
