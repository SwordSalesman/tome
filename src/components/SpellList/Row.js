import classNames from "classnames";
import { useContext } from "react";
import ThemeContext from "../../context/themeContext";

function Row({
  content,
  clickable,
  divider,
  highlight,
  active,
  children,
  ...rest
}) {
  const { theme } = useContext(ThemeContext);

  const themes = () => {
    if (divider) {
      return theme.divider;
    }
    if (active) {
      return theme.clickableActive;
    }
    if (highlight) {
      return theme.highlight;
    }
    return theme.clickableInactive;
  };

  const classes = classNames(
    "flex w-full h-6 px-2 ",
    themes()
    /*
    {
      "bg-blue-200 hover:bg-blue-300": highlight && !active,
      "bg-blue-500 hover:bg-blue-400 text-white": active,
      "cursor-pointer": !divider,
      "bg-gray-100 italic text-gray-400 justify-center": divider,
    }*/
  );

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
}

export default Row;
