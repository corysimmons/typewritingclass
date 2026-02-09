import { describe, it, expect, vi } from 'vitest'
import { withTwc } from '../src/plugin.ts'

describe('withTwc', () => {
  it('returns a valid config object', () => {
    const config = withTwc()
    expect(config).toBeDefined()
    expect(typeof config).toBe('object')
  })

  it('preserves existing config properties', () => {
    const config = withTwc({
      reactStrictMode: true,
      images: { domains: ['example.com'] },
    })
    expect(config.reactStrictMode).toBe(true)
    expect(config.images).toEqual({ domains: ['example.com'] })
  })

  it('adds a webpack function', () => {
    const config = withTwc()
    expect(typeof config.webpack).toBe('function')
  })

  it('webpack adds custom loader rule', () => {
    const config = withTwc()
    const mockConfig = { module: { rules: [] } }
    const result = config.webpack!(mockConfig, {} as any)
    expect(result.module.rules).toHaveLength(1)
    const rule = result.module.rules[0] as any
    expect(rule.test).toEqual(/\.[jt]sx?$/)
    expect(rule.exclude).toEqual(/node_modules/)
    expect(rule.use.loader).toMatch(/loader\.cjs$/)
    expect(rule.use.options).toEqual({
      outputFile: '.next/twc.css',
      strict: true,
    })
  })

  it('calls user webpack function when provided', () => {
    const userWebpack = vi.fn((config: any) => ({ ...config, modified: true }))
    const config = withTwc({ webpack: userWebpack })
    const mockConfig = { module: { rules: [] } }
    const result = config.webpack!(mockConfig, {} as any)
    expect(userWebpack).toHaveBeenCalledOnce()
    expect(result.modified).toBe(true)
  })

  it('passes custom options to loader', () => {
    const config = withTwc({}, {
      outputFile: 'dist/custom.css',
      strict: false,
    })
    const mockConfig = { module: { rules: [] } }
    config.webpack!(mockConfig, {} as any)
    const rule = mockConfig.module.rules[0] as any
    expect(rule.use.options.outputFile).toBe('dist/custom.css')
    expect(rule.use.options.strict).toBe(false)
  })

  it('uses default options when none provided', () => {
    const config = withTwc({})
    const mockConfig = { module: { rules: [] } }
    config.webpack!(mockConfig, {} as any)
    const rule = mockConfig.module.rules[0] as any
    expect(rule.use.options.outputFile).toBe('.next/twc.css')
    expect(rule.use.options.strict).toBe(true)
  })

  it('does not clobber existing webpack rules', () => {
    const config = withTwc()
    const existingRule = { test: /\.css$/, use: 'css-loader' }
    const mockConfig = { module: { rules: [existingRule] } }
    config.webpack!(mockConfig, {} as any)
    expect(mockConfig.module.rules).toHaveLength(2)
    expect(mockConfig.module.rules[0]).toBe(existingRule)
  })
})
