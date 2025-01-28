import { SVGProps } from 'react';
import * as React from 'react';

export default function Reload(props: SVGProps<SVGSVGElement>) {
  /* <svg version="1.1" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M384,352l96-109.3h-66.1C407.1,141.8,325,64,223.2,64C117.8,64,32,150.1,32,256s85.8,192,191.2,192  c43.1,0,83.8-14.1,117.7-40.7l7.5-5.9l-43.2-46.2l-6.2,4.6c-22.1,16.3-48.3,24.9-75.8,24.9C152.6,384.7,95.1,327,95.1,256  c0-71,57.5-128.7,128.1-128.7c66.4,0,120.7,50,127.4,115.3h-74.1L384,352z"
    />
  </svg> */
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      width="1em"
      fill="none"
      viewBox="0 0 32 32"
      {...props}>
      <path
        stroke={props.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        strokeMiterlimit={10}
        d="M14.3,8.1V6c0-0.8-0.8-1.3-1.4-0.8l-6.5,6c-0.5,0.4-0.5,1.2,0,1.6l6.5,6c0.6,0.5,1.4,0,1.4-0.8v-2h0.8	c6.8,0,13,4.3,15.8,11C31,16.8,23.6,8.6,14.3,8.1z"
      />
      <path
        stroke={props.stroke}
        strokeLinejoin="round"
        strokeWidth={2}
        strokeMiterlimit={10}
        d="M7.6,5l-6.2,6.2c-0.5,0.4-0.5,1.2,0,1.7L7.6,19"
      />
    </svg>
  );
}
