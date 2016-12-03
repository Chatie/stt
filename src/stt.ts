/**
 * stt - Speech to text
 *
 * https://github.com/wechaty/stt/
 *
 */
import { PassThrough }        from 'stream'

import request      = require('request')
import Ffmpeg       = require('fluent-ffmpeg')
import querystring  = require('querystring')

export async function stt(inputStream: NodeJS.ReadableStream): Promise<string> {
  const worker  = new SttWorker(inputStream)
  const text    = await worker.toText()
  return text
}

class SttWorker {
  constructor(private inputStream: NodeJS.ReadableStream) {

  }

  public async toText(): Promise<string> {
    const text = await speechToText(this.inputStream)
    return text
  }
}

async function speechToText(mp3Stream: NodeJS.ReadableStream): Promise<string> {
  const wavStream = mp3ToWav(mp3Stream)

  try {
    const text = await wavToText(wavStream)
    return text

  } catch (e) {
    console.log(e)
    return ''
  }
}

function mp3ToWav(mp3Stream: NodeJS.ReadableStream): NodeJS.ReadableStream {
  const wavStream = new PassThrough()

  Ffmpeg(mp3Stream)
    .fromFormat('mp3')
    .toFormat('wav')
    .pipe(wavStream as any)

    // .on('start', function(commandLine) {
    //   console.log('Spawned Ffmpeg with command: ' + commandLine);
    // })
    // .on('codecData', function(data) {
    //   console.log('Input is ' + data.audio + ' audio ' +
    //     'with ' + data.video + ' video');
    // })
    // .on('progress', progress => {
    //   console.log('Processing: ' + progress.percent + '% done');
    // })
    // .on('end', function() {
    //   console.log('Finished processing');
    // })
    .on('error', function(err, stdout, stderr) {
      console.log('Cannot process video: ' + err.message);
    })

  return wavStream
}

/**
 * Baidu:
 * export BAIDU_SPEECH_API_KEY=FK58sUlteAuAIXZl5dWzAHCT
 * export BAIDU_SPEECH_SECRET_KEY=feaf24adcc5b8f02b147e7f7b1953030
 * curl "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=${BAIDU_SPEECH_API_KEY}&client_secret=${BAIDU_SPEECH_SECRET_KEY}"
 *
 * OAuth: http://developer.baidu.com/wiki/index.php?title=docs/oauth/overview
 * ASR: http://yuyin.baidu.com/docs/asr/57
 */

/**
 * YunZhiSheng:
 * http://dev.hivoice.cn/download_file/USC_DevelGuide_WebAPI_audioTranscription.pdf
 */

/**
 * Google:
 * http://blog.csdn.net/dlangu0393/article/details/7214728
 * http://elric2011.github.io/a/using_speech_recognize_service.html
 */
async function wavToText(readableStream: NodeJS.ReadableStream): Promise<string> {
  const params = {
    'cuid': 'stt',
    'lan': 'zh',
    'token': '24.8c6a25b5dcfb41af189a97d9e0b7c076.2592000.1482571685.282335-8943256'
  }

  const apiUrl = 'http://vop.baidu.com/server_api?'
                + querystring.stringify(params)

  const options = {
    headers: {
      'Content-Type': 'audio/wav; rate=8000',
    },
  }

  return new Promise<string>((resolve, reject) => {
    readableStream.pipe(request.post(apiUrl, options, (err, httpResponse, body) => {
      // "err_msg":"success.","err_no":0,"result":["这是一个测试测试语音转文字，"]
      if (err) {
        return reject(err)
      }
      try {
        const obj = JSON.parse(body)
        if (obj.err_no !== 0) {
          throw new Error(obj.err_msg)
        }

        return resolve(obj.result[0])

      } catch (err) {
        return reject(err)
      }
    }))
  })
}

function streamToString(stream): Promise<string> {
  let output = ''

  return new Promise<string>((resolve, reject) => {
    stream.on('readable', function() {
        let read = stream.read()
        if (read !== null) {
            // New stream data is available
            output += read.toString()
        } else {
            // Stream is now finished when read is null.
            // You can callback here e.g.:

            resolve(output)
            return
        }
    })

    stream.on('error', function(err) {

      reject(err)
      return

    })

  })
}

typeof streamToString
