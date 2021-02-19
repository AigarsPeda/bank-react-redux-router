import React from "react";

const CreditCardChipIcon = (
  props: React.SVGProps<SVGSVGElement>
): JSX.Element => {
  return (
    <svg
      viewBox="0 0 62 62"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M43.333 16a2 2 0 012 2v25.333a2 2 0 01-2 2H18a2 2 0 01-2-2V18a2 2 0 012-2h25.333zm7.334 0a5.335 5.335 0 00-5.334-5.333H16A5.335 5.335 0 0010.667 16v29.333A5.335 5.335 0 0016 50.667h29.333a5.335 5.335 0 005.334-5.334V16zM21.333 53.333v8h-2.666v-8h2.666zm10.667 0v8h-2.667v-8H32zm5.333 0v8h-2.666v-8h2.666zm-10.666 0v8H24v-8h2.667zm16 0v8H40v-8h2.667zM21.333 0v8h-2.666V0h2.666zM32 0v8h-2.667V0H32zm5.333 0v8h-2.666V0h2.666zM26.667 0v8H24V0h2.667zm16 0v8H40V0h2.667zm10.666 40h8v2.667h-8V40zm0-10.667h8V32h-8v-2.667zm0-5.333h8v2.667h-8V24zm0 10.667h8v2.666h-8v-2.666zm0-16h8v2.666h-8v-2.666zM0 40h8v2.667H0V40zm0-10.667h8V32H0v-2.667zM0 24h8v2.667H0V24zm0 10.667h8v2.666H0v-2.666zm0-16h8v2.666H0v-2.666z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default CreditCardChipIcon;
