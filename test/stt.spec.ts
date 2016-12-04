import { createReadStream } from 'fs'

import { test } from 'ava'

import { stt } from '../'

test('stt(一二三.mp3)', async t => {
  const fixture = 'test/fixture/一二三.mp3'

  const speechStream = createReadStream(fixture)
  const text = await stt(speechStream)
  const isExpected = /123/.test(text) || /一二三/.test(text)

  t.true(isExpected, 'should convert speech to right text: 一二三')
})

test('stt(测试.mp3)', async t => {
  const fixture = 'test/fixture/测试.mp3'

  const speechStream = createReadStream(fixture)
  const text = await stt(speechStream)
  const isExpected = /测试/.test(text)

  t.true(isExpected, 'should convert speech to right text: 测试')
})

test('stt(how-old-is-the-brooklyn-bridge.flac', async t => {
  const fixture = 'test/fixture/how-old-is-the-brooklyn-bridge.flac'
  const EXPECTED_TEXT = 'how old is the brooklyn bridge'
  const EXPECTED_RE = new RegExp(EXPECTED_TEXT, 'i')

  const speechStream = createReadStream(fixture)
  const text = await stt(speechStream, { format: 'x-flac' })
  const isExpected = EXPECTED_RE.test(text)

  t.true(isExpected, 'should convert speech to right text: ' + EXPECTED_TEXT)
})
