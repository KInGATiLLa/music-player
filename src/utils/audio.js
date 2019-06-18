export const audioFileRead = (audio, track, callback) => {
  const rdr = new FileReader()
  rdr.addEventListener('load', e => {
    audio.src = e.target.result
  })

  if (track) {
    rdr.readAsDataURL(track)
  }
  audio.addEventListener('loadeddata', callback)
}
