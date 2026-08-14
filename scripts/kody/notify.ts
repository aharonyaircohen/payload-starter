#!/usr/bin/env tsx
/**
 * Generic Slack notification dispatcher for watch agents.
 *
 * Reads channel webhook URLs from .kody/watch/notify.config.json.
 * Fires Slack Block Kit payloads for each enabled channel.
 * Gating is enforced via --when + NOTIFY_RESULT env var.
 *
 * Usage:
 *   pnpm tsx scripts/kody/notify.ts \
 *     --agent <name> \
 *     --channels slack,slack-dev \
 *     --when <always|on-critical|on-action|on-failure|never> \
 *     --color <good|warning|danger|#hex> \
 *     --title "<title>" \
 *     --body "<body>"
 *
 * Env vars:
 *   NOTIFY_RESULT  ok | critical | action | failure
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { parseArgs } from 'util'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChannelConfig {
  enabled: boolean
  webhookUrl: string
}

interface NotifyConfig {
  channels: Record<string, ChannelConfig>
}

// ─── CLI args ────────────────────────────────────────────────────────────────

const { values } = parseArgs({
  options: {
    agent: { type: 'string' },
    channels: { type: 'string' },
    when: { type: 'string' },
    color: { type: 'string' },
    title: { type: 'string' },
    body: { type: 'string' },
  },
  strict: true,
})

const agent = String(values.agent ?? 'unknown')
const channels = String(values.channels ?? 'slack')
const when = String(values.when ?? 'always')
const color = String(values.color ?? 'good')
const title = String(values.title ?? '')
const body = String(values.body ?? '')

// ─── Config ─────────────────────────────────────────────────────────────────

const configPath = join(process.cwd(), '.kody', 'watch', 'notify.config.json')
let config: NotifyConfig

try {
  const raw = readFileSync(configPath, 'utf-8')
  config = JSON.parse(raw) as NotifyConfig
} catch {
  console.error(`[notify] Failed to read ${configPath} — skipping notification`)
  process.exit(0)
}

// ─── Gating ─────────────────────────────────────────────────────────────────

const result = process.env.NOTIFY_RESULT ?? 'ok'

const shouldFire = (() => {
  switch (when) {
    case 'always':
      return true
    case 'on-critical':
      return result === 'critical'
    case 'on-action':
      return result === 'action'
    case 'on-failure':
      return result === 'failure'
    case 'never':
      return false
    default:
      return false
  }
})()

if (!shouldFire) {
  process.exit(0)
}

// ─── Slack payload ────────────────────────────────────────────────────────────

const payload = {
  attachments: [
    {
      color: color,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${title}*`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: body || '_No details_',
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Agent: \`${agent}\` | Result: \`${result}\` | ${new Date().toISOString()}`,
            },
          ],
        },
      ],
    },
  ],
}

// ─── Fire webhooks ────────────────────────────────────────────────────────────

const channelNames = channels.split(',').map((c) => c.trim())
let exitCode = 0

for (const channelName of channelNames) {
  const channel = config.channels?.[channelName]
  if (!channel) {
    console.warn(`[notify] Unknown channel: ${channelName}`)
    continue
  }
  if (!channel.enabled) {
    console.log(`[notify] Channel ${channelName} is disabled — skipping`)
    continue
  }

  const webhookUrl = resolveEnv(channel.webhookUrl)
  if (!webhookUrl) {
    console.warn(`[notify] No webhook URL configured for channel: ${channelName}`)
    continue
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      const text = await response.text()
      console.error(`[notify] ${channelName} — HTTP ${response.status}: ${text}`)
      exitCode = 1
    } else {
      console.log(`[notify] ${channelName} — notification sent`)
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`[notify] ${channelName} — error: ${msg}`)
    exitCode = 1
  }
}

process.exit(exitCode)

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Resolve $VAR patterns in a string using process.env.
 * Falls back to empty string if the env var is not set.
 */
function resolveEnv(value: string): string {
  return value.replace(/\$\{?(\w+)\}?/g, (_, name) => process.env[name] ?? '')
}
