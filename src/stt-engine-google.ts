const Speech = require('@google-cloud/speech')

function sttEngineGoogle(inputStream): Promise<string> {
  const API_KEY='AIzaSyAiOFC1pOzUNW4IskqSdJUqqftGZzgGX6M'

  const options = {
    config: {
      encoding: 'LINEAR16',
      sampleRate: 16000
    },
    key: API_KEY,
  }

  const speech = Speech({

  })

  var request = {
    config: {
      encoding: 'LINEAR16',
      sampleRate: 16000,
    },
    singleUtterance: false,
    interimResults: false,
  }

  return new Promise<string>((resolve, reject) => {
    inputStream.pipe(
      speech.createRecognizeStream(request))

      speech(options, (err, results) => {
        if (err) {
          reject(err)
          return
        }
        resolve(results)
        return
      })
    )
  })
}

export {
  sttEngineGoogle,
  sttEngineGoogle as stt,
  sttEngineGoogle as sttEngine,
}
export default sttEngineGoogle
