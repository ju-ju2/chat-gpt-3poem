import { PulseLoader } from "react-spinners";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <p>로딩중...</p>
      <PulseLoader
        color="#36d7b7"
        size={30}
        margin={10}
        loading={true}
        cssOverride={{}}
        speedMultiplier={1}
      />
    </div>
  );
}
