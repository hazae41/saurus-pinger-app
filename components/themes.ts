// deno-lint-ignore triple-slash-reference
/// <reference lib="dom" />

import React, { RefObject, useEffect, useState } from "https://esm.sh/react"
import { Ref } from "./react.tsx"

/**
 * Apply the given element's theme to the body background
 * @param ref Element to take the theme from
 */
export function useBackground(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;
    const { body } = window.document

    const background = window
      .getComputedStyle(ref.current)
      .getPropertyValue("--background")

    const old = body.style.background
    body.style.background = background

    return () => {
      body.style.background = old
    }
  }, [ref.current])
}