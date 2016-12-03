/**
 * stt - Speech to text
 *
 * https://github.com/wechaty/stt/
 *
 */
const Speech = require('@google-cloud/speech')

const API_KEY='AIzaSyAiOFC1pOzUNW4IskqSdJUqqftGZzgGX6M'

function sttEngineGoogle(inputStream): Promise<string> {
  const key = API_KEY

  const config = {
    encoding: 'LINEAR16',
    sampleRate: 16000,
  }

  const options = {
    config,
    key,
    singleUtterance: false,
    interimResults: false,
  }

  const speech = Speech({
    projectId: 'wechaty-bo'
  })
  const recongnizeStream = speech.createRecognizeStream(options)

  return new Promise<string>((resolve, reject) => {
    recongnizeStream
    .on('error', err => reject(err))
    .on('data', data => {
      console.log('Data received: %j', data)
      resolve(data)
    })

    inputStream.pipe(recongnizeStream)
  })
}

export {
  sttEngineGoogle,
  sttEngineGoogle as stt,
  sttEngineGoogle as sttEngine,
}
export default sttEngineGoogle
