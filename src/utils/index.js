export function parseQuery(queryString) {
  var query = {}
  var pairs = (queryString[0] === '?'
    ? queryString.substr(1)
    : queryString
  ).split('&')
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(
      pair[1] || '',
    )
  }
  return query
}

export function convertTime(time) {
  let result = ''
  if (isNaN(time) || time === '' || typeof time !== 'number')
    return '00:00'
  let hours = parseInt(time / 3600, 10) % 24,
    minutes = parseInt(time / 60, 10) % 60,
    seconds = parseInt(time % 60, 10)
  if (hours > 0) {
    result =
      (hours < 10 ? '0' + hours : hours) +
      ':' +
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
  } else {
    result =
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
  }
  return result
}

export function parseTrackName(track) {
  return track.name.replace('.mp3', '')
}

export function sideBar(o, onclick) {
  if (!o) {
    // attach/remove event handler
    document.addEventListener('click', onclick, false)
  } else {
    document.removeEventListener('click', onclick, false)
  }
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
    .replace('mp3', '')
}
