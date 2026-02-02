import { broadcastAuthToTab } from "../utils/authBroadcast";
import { useSelector } from "react-redux";

const OpenInNewTab = ({ to, children }) => {
  const auth = useSelector(state => state.auth);

  const handleClick = () => {
    broadcastAuthToTab(auth);
    window.open(to, "_blank");
  };

  return (
    <span onClick={handleClick} style={{ cursor: "pointer" }}>
      {children}
    </span>
  );
};

export default OpenInNewTab;
