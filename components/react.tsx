// deno-lint-ignore triple-slash-reference
/// <reference lib="dom" />

import { Dispatch, ReactNode, RefObject, SetStateAction, useEffect, useMemo } from 'https://esm.sh/react'
import { createPortal } from "https://esm.sh/react-dom"

export type State<T> = [T, Dispatch<SetStateAction<T>>]
export type Ref<T> = ((x: T | null) => void) | RefObject<T> | null

export function Modal(props: { children: ReactNode }) {
  const { children } = props
  const { document } = window

  const $ = useMemo(() => {
    if (!document) return;
    return document.createElement("div")
  }, [document])

  useEffect(() => {
    if (!$) return

    document.body.appendChild($)

    return () => {
      document.body.removeChild($)
    }
  }, [$])

  if (!$) return null;
  return createPortal(children, $)
}