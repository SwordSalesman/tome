import classNames from "classnames";

function Row({
  content,
  clickable,
  divider,
  highlight,
  active,
  children,
  ...rest
}) {
  const classes = classNames("flex w-full h-6 px-2  rounded-lg", {
    "bg-blue-200 hover:bg-blue-300": highlight && !active,
    "bg-blue-500 hover:bg-blue-400 text-white": active,
    "cursor-pointer hover:bg-gray-100": clickable,
    "bg-gray-100 italic text-gray-400 justify-center": divider,
  });

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
}

export default Row;
