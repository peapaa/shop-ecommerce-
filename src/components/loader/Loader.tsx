import { Spin } from "antd";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin spinning={true} />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
