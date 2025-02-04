import Joi from 'joi'
import { createServiceTester } from '../tester.js'

export const t = await createServiceTester()

t.create('language count (empty repo)')
  .get(
    '/CanisHelix/shields-badge-test-empty.json?gitea_url=https://codeberg.org',
  )
  .expectBadge({
    label: 'languages',
    message: '0',
  })

t.create('language count')
  .get('/CanisHelix/shields-badge-test.json?gitea_url=https://codeberg.org')
  .expectBadge({
    label: 'languages',
    message: Joi.number().integer().positive(),
  })

t.create('language count (user or repo not found)')
  .get('/CanisHelix/does-not-exist.json?gitea_url=https://codeberg.org')
  .expectBadge({
    label: 'languages',
    message: 'user or repo not found',
  })
