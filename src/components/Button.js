import classNames from "classnames";

function Button({ children, active, ...rest }) {
  const classes = classNames(
    rest.className,
    "m-1 px-3 w-64 border border-2 rounded-full flex justify-center hover:brightness-90",
    {
      "bg-blue-500 border-blue-600 text-white": active,
    }
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

export default Button;
