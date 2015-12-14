/* global createjs */

let loader = new createjs.LoadQueue()
let manifest = [
  {
    id: 'snow',
    src: 'textures/snow.png',
    weight: 1
  },
  {
    id: 'stripe',
    src: 'textures/stripe.png',
    weight: 1
  }
]

for (let i = 0; i < 24; i++) {
  manifest.push(
    {
      id: `frame${i}`,
      src: `textures/deer/${i}.png`,
      weight: 1
    }
  )
}

loader.loadManifest(manifest, false)
export default loader
