import { useEffect, useState } from "https://esm.sh/react"

export interface PlayerInfo {
  name: string,
  uuid: string,
}

export function useAvatar(player: PlayerInfo) {
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    getAvatar().then(setAvatar)
  }, [])

  async function getAvatar() {
    const nocors = "https://cors-anywhere.herokuapp.com/"
    const pdb = "https://playerdb.co/api/player/minecraft/"
    const res = await fetch(nocors + pdb + player.name)
    const json = await res.json()
    return json.data.player.avatar
  }

  return avatar
}