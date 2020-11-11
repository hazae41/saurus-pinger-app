import React, { useEffect, useRef, useState } from 'https://esm.sh/react'

import { useBackground } from "./themes.ts"
import { Icon } from "./material.tsx"

import { CloseError, WSClientConn, WSConn } from "../deps/multisocket.ts"
import { config } from "../config.ts"
import { State } from "./react.tsx"
import { PlayerInfo } from "./player.tsx"

function display(e: unknown) {
  if (e instanceof CloseError)
    return e.reason
  if (e instanceof Error)
    return e.message
  else
    return "An error occured"
}

export interface Player {
  name: string
  uuid: string
  conn: WSConn
}

export const Connector = (props: {
  $player: State<Player | undefined>
}) => {
  const [, setPlayer] = props.$player
  const [error, setError] = useState<unknown>()
  const [code, setCode] = useState<string>()

  useEffect(() => {
    connect()
  }, [])

  async function connect() {
    const conn = new WSClientConn(config.url)

    try {
      await conn.waitready

      const channel =
        await conn.open("/hello", { type: "app" })

      const code = await channel.read()

      if (typeof code !== "string")
        throw new Error("Type")

      setCode(code)

      const player =
        await channel.read() as PlayerInfo
      setCode(undefined)
      setPlayer({ ...player, conn })
    } catch (e: unknown) {
      console.error(e)
      setError(e)
      if (!conn.closed)
        await conn.close()
    }
  }

  if (error)
    return (
      <div
        className="bold"
        children={display(error)} />
    )

  if (code)
    return (
      <div className="fullwidth max500 flex">
        <div
          className="bold h6"
          children="Enter the following code to authorize Pinger" />
        <div className="bold h1"
          children={code} />
        <div className="fullwidth rounded paper input"
          children={"/! authorize " + code} />
      </div>
    )

  return <div className="circular-progress" />
}