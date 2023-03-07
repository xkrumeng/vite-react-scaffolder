import type { Config } from 'jest'

const config:Config = {
  bail: 1,
  verbose: true,

  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    "\\.(css|less|sass|scss)$": 'identity-obj-proxy'
  },
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}

export default config
