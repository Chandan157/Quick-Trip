import "./avatar.scss";

const Avatar = ({ name, setSettings }) => {
  return (
    <div onClick={() => setSettings(true)} className="avatar_container">
      <div className="avatar">
        <img className="avatar_img" src="/assets/avatar.png" alt="avatar_img" />
        <p className="avatar_title">{name}</p>
      </div>
    </div>
  );
};

export default Avatar;
