import "./MessageBox.scss";

export const MessageBox = ({ text, Icon, color = "textPrimary" }) => {
  return (
    <div className="message-box flex column align-center">
      <p align="center" variant="h6" className="message-box-text" color={color}>
        {text}
      </p>
      {Icon}
    </div>
  );
};
