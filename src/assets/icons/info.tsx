import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const InfoIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m9.25 9.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H10V6.25Z"
    />
  </Svg>
)
export default InfoIcon