import classNames from "classnames";
import { useContext } from "react";
import ThemeContext from "../context/themeContext";

function ContentPane({ children, ...rest }) {
  const { theme } = useContext(ThemeContext);

  const classes = classNames(
    rest.className,
    "flex flex-col border-2 rounded-lg m-1 p-2",
    theme.panel
  );

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
}

export default ContentPane;
