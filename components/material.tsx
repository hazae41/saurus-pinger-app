import React, { CSSProperties } from "https://esm.sh/react"

export const Icon = (props: {
  name: string,
  style?: CSSProperties
}) => {
  return (
    <i
      className="material-icons"
      children={props.name}
      style={props.style} />
  )
}