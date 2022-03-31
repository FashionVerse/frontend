import Head from 'next/head'
import Viewer from '../src/components/Viewer'
import Model from '../src/components/Model'

export default function Home() {
  return (
    <>
      <Head>
        <title>Demo MVP</title>
      </Head>
      <Viewer>
          {/* {"name":"Cyber Punk Outfit","description":"A Cyber Punk Outfit","image":"https://ipfs.infura.io/ipfs/QmbmAYjQxCcj3MANspmK6KGKjsqQgrnNAgyAbv1iYfYV3d","animation_url":"https://ipfs.infura.io/ipfs/QmWpez4dCweVKgaMWtDXrqkDnDZcGBxrGp12khdzE9b2XJ"} */}
        <Model link="https://ipfs.infura.io/ipfs/QmRyXLW5eRwKarbyWoxNJigUNStcFzzVf5GdLyRJ3Vpwg9?filename=test.glb" 
        imgLink="https://ipfs.infura.io/ipfs/Qmd4qbWo1Rbh78EjZiL9EVHtBKwqfwn9a6SaqmgpshCYrS"/>
      </Viewer>
    </>
  )
}