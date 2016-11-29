import { createReadStream } from 'fs'

import { test } from 'ava'

import { stt } from '../'

test('stt(一二三.mp3)', async t => {
  const fixture = 'test/fixture/一二三.mp3'

  const speechStream = createReadStream(fixture)
  const text = await stt(speechStream)
  const isExpected = /123/.test(text) || /一二三/.test(text)

  t.true(isExpected, 'should convert speech to right text')
})
