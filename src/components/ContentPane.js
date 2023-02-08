import classNames from "classnames";

function ContentPane({ children, ...rest }) {
  const classes = classNames(
    rest.className,
    "flex flex-col border-2 rounded-lg m-1 p-2"
  );

  return <div className={classes}>{children}</div>;
}

export default ContentPane;
