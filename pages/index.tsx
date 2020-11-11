import React, { useEffect, useRef, useState } from 'https://esm.sh/react'

import { useBackground } from "../components/themes.ts"
import { Icon } from "../components/material.tsx"

import { Connector, Player } from "../components/connector.tsx"
import { PlayerInfo, useAvatar } from "../components/player.tsx"
import { State } from "../components/react.tsx"
import { cx } from "../components/classnames.tsx"

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  useBackground(ref)

  return (
    <div ref={ref} className="light-themed page">
      <div className="flexbar">
        <div className="primary">
          <Icon
            style={{ fontSize: 128 }}
            name="offline_bolt" />
        </div>
        <div className="xspace16" />
        <div>
          <div
            className="primary italic superbold h2"
            children="Pinger" />
          <div
            style={{ transform: "translateY(-12px)" }}
            className="primary italic superbold h5"
            children="for Saurus" />
        </div>
      </div>
      <div style={{ height: 32 }} />
      <Content />
    </div >
  )
}

export const Content = () => {
  const $player = useState<Player>()
  const [player] = $player

  if (player)
    return <Pinger
      player={player} />

  return <Connector
    $player={$player} />
}

export interface ExtraPlayerInfo {
  name: string
  uuid: string
  pingable?: boolean
}

export const Pinger = (props: {
  player: Player
}) => {
  const { player } = props

  const $players = useState<PlayerInfo[]>([])
  const [players, setPlayers] = $players

  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    set(true)
    const i = setInterval(get, 1000)
    return () => clearInterval(i)
  }, [])

  async function get() {
    const { name, uuid } = player
    const data = await player.conn
      .request("/ping/get", { name, uuid })
    const value = data as boolean
    setEnabled(value)
  }

  async function set(value: boolean) {
    await player.conn.request("/ping/set", value)
  }

  async function toggle() {
    await set(!enabled)
    await get()
  }

  useEffect(() => {
    if (!enabled) setPlayers([])
    else list().then(setPlayers)
  }, [enabled])

  async function list() {
    const data = await player.conn
      .request("/server/list", ["pinger"])
    const players = data as ExtraPlayerInfo[]
    return players.filter(it => it.pingable)
  }

  return (<>
    <Button
      onClick={toggle}
      clicked={enabled} />
    <div style={{ height: 32 }} />
    <div className="fullwidth players-grid">
      {players.map(target => (
        <PlayerHead
          player={player}
          target={target} />
      ))}
    </div>
  </>)
}

export const Button = (props: {
  clicked: boolean
  onClick: () => void
}) => {
  const { clicked, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={cx(
        "neubutton icon",
        clicked && "clicked"
      )}>
      <Icon
        style={{ fontSize: 64 }}
        name="power_settings_new" />
    </div>
  )
}

export const PlayerHead = (props: {
  player: Player,
  target: PlayerInfo
}) => {
  const { player, target } = props

  const avatar = useAvatar(target)

  async function ping() {
    await player.conn.request("/ping", target)
  }

  return (
    <div className="flex">
      <img
        src={avatar}
        style={{ height: 96 }}
        onClick={ping}
        className="clickable rounded" />
      <div className="yspace8" />
      <div
        className="bold"
        children={player.name} />
    </div>
  )
}