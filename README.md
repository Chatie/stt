# stt
Speech to Text for Node.js

Currently support Chinese only. Will add more language(en/etc) and more engine(now stt use baidu api) recently.

# Quick Start

## JavaScript

```javascript
const stt = require('stt')

const speechStream = createReadStream('./test/fixture/测试.mp3')

stt(speechStream).then(text => {
  console.log('STT: ' + text)
})
```

## TypeScript

```typescript
import { stt } from 'stt'

const speechStream = createReadStream('./test/fixture/测试.mp3')

const text = await stt(speechStream)

console.log('STT: ' + text)
```

# Requirement

[Ffmpeg](https://www.ffmpeg.org/) is required for converting the speech stream format.

# Todo

* Support Languages
  * [x] Chinese 普通话
  * [ ] English
* Support Stream Formats
  * [x] MP3 Input Stream
  * [ ] ANY Input Stream
* Support Speech Recongnition Engines
  * [ ] [Google Cloud Speech API](https://cloud.google.com/speech/)
  * [ ] [Apple Siri Nuance Mix](https://developer.nuance.com/public/index.php?task=mix)
  * [ ] [Bing Speech API](https://www.microsoft.com/cognitive-services/en-us/speech-api)
  * [ ] [Watson Speech to Text](http://www.ibm.com/watson/developercloud/speech-to-text.html)
  * [ ] [XFYun Voice Dictation](http://www.xfyun.cn/services/voicedictation)
  * [x] [Baidu ASR](http://yuyin.baidu.com/asr)
  * [ ] [Tencent Artificial Audio Intelligence](https://www.qcloud.com/product/aai) 
  * [ ] [HiVoice](http://dev.hivoice.cn/exp_center/asr/asr.jsp)

# Copyright

2016© Huan LI <https://git.io/zixia>

MIT LICENSE
