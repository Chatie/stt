/**
 * stt - Speech to text
 *
 * https://github.com/wechaty/stt/
 *
 * Engine: Baidu
 *
 */

/**
 * Baidu:
 * export BAIDU_SPEECH_API_KEY=FK58sUlteAuAIXZl5dWzAHCT
 * export BAIDU_SPEECH_SECRET_KEY=feaf24adcc5b8f02b147e7f7b1953030
 * curl "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=${BAIDU_SPEECH_API_KEY}&client_secret=${BAIDU_SPEECH_SECRET_KEY}"
 *
 * OAuth: http://developer.baidu.com/wiki/index.php?title=docs/oauth/overview
 * ASR: http://yuyin.baidu.com/docs/asr/57
 */

import { PassThrough }        from 'stream'

import request      = require('request')
import Ffmpeg       = require('fluent-ffmpeg')
import querystring  = require('querystring')

async function sttEngineBaidu(flacStream: NodeJS.ReadableStream): Promise<string> {
  const worker  = new SttWorker(flacStream)
  const text    = await worker.toText()
  return text
}

class SttWorker {
  constructor(private flacStream: NodeJS.ReadableStream) {

  }

  public async toText(): Promise<string> {
    const text = await speechToText(this.flacStream)
    return text
  }

  public async function wavToText(readableStream: NodeJS.ReadableStream): Promise<string> {
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
}

export {
  sttEngineBaidu,
  sttEngineBaidu as stt,
  sttEngineBaidu as sttEngine,
}

export default sttEngineBaidu
