const InfoLine = ({ title, content }) => {
  return (
    <div className="flex">
      <div>
        {title !== undefined && <b>{title + ". "}</b>}
        {content}
      </div>
    </div>
  );
};

export default InfoLine;
