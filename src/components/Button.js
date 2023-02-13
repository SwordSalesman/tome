import classNames from "classnames";
import { useContext } from "react";
import ThemeContext from "../context/themeContext";

function Button({ children, active, ...rest }) {
  const { theme } = useContext(ThemeContext);

  const classes = classNames(
    rest.className,
    active ? theme.clickableActive : theme.clickableInactive,
    "m-1 px-3 w-64 border border-2 rounded-full flex justify-center"
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

export default Button;
