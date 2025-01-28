import { SVGProps } from 'react';

export default function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 rotate-90"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}>
      <path
        stroke={props.stroke ?? 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  );
}
