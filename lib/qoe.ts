// QOEClient wrapper for Next.js
// Use `file:../qoe-js` in package.json for local dev on unreleased changes.
export { QOEClient } from '@netprofile/qoe-js'
export type {
  ServerInfo,
  QualityResults,
  SpeedResults,
  ApplicationResults,
  ProgressEvent,
  SampleEvent,
  BandwidthSample,
  LatencySample,
  TestConfig,
} from '@netprofile/qoe-js'
