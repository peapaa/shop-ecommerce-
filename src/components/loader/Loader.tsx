import { Spin } from "antd";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 12,
      }}
    >
      <Spin spinning={true} />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
