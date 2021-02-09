import React from "react";

const SearchIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M63.49 57.723L46.945 41.176a25.816 25.816 0 004.952-15.23C51.896 11.64 40.256 0 25.946 0 11.64 0 0 11.64 0 25.947c0 14.31 11.64 25.946 25.947 25.946a25.809 25.809 0 0014.632-4.528L57.213 64l6.278-6.277zM7.61 25.947c0-10.112 8.227-18.339 18.34-18.339 10.111 0 18.338 8.227 18.338 18.339 0 10.112-8.227 18.338-18.339 18.338-10.114 0-18.338-8.226-18.338-18.338z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default SearchIcon;
