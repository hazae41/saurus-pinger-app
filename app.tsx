import React, { ComponentType } from 'https://esm.sh/react'
import { Head, Import } from 'https://deno.land/x/aleph/mod.ts'
import { config } from "./config.ts"

export default function App({ Page }: { Page: ComponentType<any> }) {
  return (<>
    <Head>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet" />
      <link
        href={"https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"}
        rel="stylesheet" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no" />
      <link rel="icon" href="/steve.png" />
      <title children={config.title} />
      <Import from="../style/font.less" />
      <Import from="../style/padding.less" />
      <Import from="../style/colors.less" />
      <Import from="../style/sizes.less" />
      <Import from="../style/progress.less" />
      <Import from="../style/flex.less" />
      <Import from="../style/grid.less" />
      <Import from="../style/neu.less" />
      <Import from="../style/index.less" />
    </Head>
    <Page />
  </>)
}
