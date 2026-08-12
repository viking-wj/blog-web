import { describe, expect, it } from 'vitest'
import { formatDate, plainTextExcerpt } from './format'

describe('formatDate', () => {
  it('returns a readable fallback when no date is supplied', () => {
    expect(formatDate('')).toBe('日期未知')
  })

  it('keeps unknown date formats instead of hiding the source value', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date')
  })
})

describe('plainTextExcerpt', () => {
  it('removes common Markdown and HTML syntax', () => {
    expect(plainTextExcerpt('# 标题\n\n[链接](https://example.com) <strong>正文</strong>')).toBe('标题 链接 正文')
  })

  it('limits long excerpts and adds an ellipsis', () => {
    expect(plainTextExcerpt('123456789', 5)).toBe('12345…')
  })
})
