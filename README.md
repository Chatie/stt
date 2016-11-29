# stt
Speech to Text for Node.js

## Quick Start

```js
import { stt } from 'stt'

const speechStream = createReadStream('./speech.mp3')
stt(speechStream).then(text => {
  console.log('STT: ' + text)
})
```

Currently only support Chinese. Will add more language(en/etc) and more engine(now stt use baidu api) in the future.

# Copyright & License

2016© Huan LI <zixia@zixia.net>, MIT LICENSE
