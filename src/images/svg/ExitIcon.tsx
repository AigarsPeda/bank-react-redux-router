import React from "react";

const ExitIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      viewBox="0 0 64 54"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M42.667 18.667V8L64 26.667 42.667 45.333V34.667H21.333v-16h21.334zm-5.334 32.432v-5.987A21.148 21.148 0 0126.667 48C14.904 48 5.333 38.43 5.333 26.667c0-11.763 9.571-21.334 21.334-21.334 3.888 0 7.525 1.062 10.666 2.888V2.235A26.553 26.553 0 0026.667 0C11.94 0 0 11.939 0 26.667c0 14.728 11.941 26.666 26.667 26.666 3.794 0 7.397-.805 10.666-2.234z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default ExitIcon;
