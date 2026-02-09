import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock typewritingclass-react/server before importing the component
vi.mock('typewritingclass-react/server', () => ({
  getStyleSheet: vi.fn(() => ''),
}))

// Mock React to avoid JSX transform issues
vi.mock('react', () => ({
  default: {
    createElement: vi.fn((tag: string, props: any) => ({
      type: tag,
      props,
    })),
  },
  createElement: vi.fn((tag: string, props: any) => ({
    type: tag,
    props,
  })),
}))

import { TWCStyles } from '../src/TWCStyles.tsx'
import { getStyleSheet } from 'typewritingclass-react/server'
import React from 'react'

describe('TWCStyles', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders a style element', () => {
    TWCStyles()
    expect(React.createElement).toHaveBeenCalledWith(
      'style',
      expect.objectContaining({
        'data-twc': '',
      }),
    )
  })

  it('includes data-twc attribute', () => {
    TWCStyles()
    const call = vi.mocked(React.createElement).mock.calls[0]
    expect(call[1]).toHaveProperty('data-twc', '')
  })

  it('passes CSS from getStyleSheet via dangerouslySetInnerHTML', () => {
    vi.mocked(getStyleSheet).mockReturnValue('._abc { color: red; }')
    TWCStyles()
    const call = vi.mocked(React.createElement).mock.calls[0]
    expect(call[1].dangerouslySetInnerHTML).toEqual({
      __html: '._abc { color: red; }',
    })
  })

  it('renders empty style when no CSS registered', () => {
    vi.mocked(getStyleSheet).mockReturnValue('')
    TWCStyles()
    const call = vi.mocked(React.createElement).mock.calls[0]
    expect(call[1].dangerouslySetInnerHTML).toEqual({ __html: '' })
  })

  it('calls getStyleSheet on each render', () => {
    TWCStyles()
    TWCStyles()
    expect(getStyleSheet).toHaveBeenCalledTimes(2)
  })
})
