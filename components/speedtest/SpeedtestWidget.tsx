'use client'

import { useRef, useState } from 'react'
import { QOEClient } from '@/lib/qoe'
import type { QualityResults, SpeedResults, SampleEvent, ProgressEvent, BandwidthSample } from '@/lib/qoe'
import { makeServerInfo } from '@/lib/config'
import BandwidthChart from './BandwidthChart'
import ServerSelector from './ServerSelector'

type TestMode = 'quality' | 'speed'
type TestStatus = 'idle' | 'running' | 'done' | 'error'

interface Results {
  downloadMbps?: number
  uploadMbps?: number
  latencyMs?: number
  bufferbloatMs?: number
  packetLossPct?: number
  qualityScore?: number
}

export default function SpeedtestWidget() {
  const [status, setStatus] = useState<TestStatus>('idle')
  const [mode, setMode] = useState<TestMode>('quality')
  const [serverUrl, setServerUrl] = useState('')
  const [results, setResults] = useState<Results>({})
  const [downloadSamples, setDownloadSamples] = useState<{ t: number; v: number }[]>([])
  const [uploadSamples, setUploadSamples] = useState<{ t: number; v: number }[]>([])
  const [statusMsg, setStatusMsg] = useState('')
  const [percentage, setPercentage] = useState(0)
  const clientRef = useRef<QOEClient | null>(null)

  async function runTest() {
    if (!serverUrl) return

    setStatus('running')
    setResults({})
    setDownloadSamples([])
    setUploadSamples([])
    setStatusMsg('Initializing...')
    setPercentage(0)

    try {
      const client = new QOEClient()
      client.setServer(makeServerInfo(serverUrl))
      clientRef.current = client

      client.on('progress', (e: ProgressEvent) => {
        setStatusMsg(e.currentPhase)
        setPercentage(e.percentage)
      })

      client.on('sample', (e: SampleEvent) => {
        if (e.sampleType === 'download') {
          const bw = (e.sample as BandwidthSample).bandwidth / 1e6
          setDownloadSamples(prev => [...prev, { t: e.timestamp, v: bw }])
        } else if (e.sampleType === 'upload') {
          const bw = (e.sample as BandwidthSample).bandwidth / 1e6
          setUploadSamples(prev => [...prev, { t: e.timestamp, v: bw }])
        }
      })

      if (mode === 'quality') {
        const r: QualityResults = await client.runQualityTest()
        setResults({
          downloadMbps: r.download.bandwidthMbps,
          uploadMbps: r.upload.bandwidthMbps,
          latencyMs: r.idleLatency.median,
          bufferbloatMs: r.bufferbloat,
          packetLossPct: r.packetLoss.lossPercent,
          qualityScore: r.qualityScore,
        })
      } else {
        const r: SpeedResults = await client.runSpeedTest()
        setResults({
          downloadMbps: r.download.bandwidthMbps,
          uploadMbps: r.upload.bandwidthMbps,
          latencyMs: r.idleLatency.median,
          packetLossPct: r.packetLoss.lossPercent,
        })
      }

      setStatus('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setStatusMsg(err instanceof Error ? err.message : 'Test failed')
    }
  }

  function stopTest() {
    clientRef.current?.stop()
    clientRef.current = null
    setStatus('idle')
  }

  return (
    <div className="space-y-6">
      <ServerSelector value={serverUrl} onChange={setServerUrl} />

      <div className="flex gap-2">
        {(['quality', 'speed'] as TestMode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            disabled={status === 'running'}
            className={`px-4 py-2 rounded text-sm font-medium border ${
              mode === m
                ? 'bg-black text-white border-black'
                : 'border-gray-300 hover:border-gray-500'
            }`}
          >
            {m === 'quality' ? 'Quality' : 'Speed'}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500">
        {mode === 'quality'
          ? 'Single-connection test measuring real-world performance, bufferbloat, and quality score.'
          : 'Parallel-connection test measuring peak bandwidth capacity.'}
      </p>

      <div className="flex gap-3 items-center">
        {status !== 'running' ? (
          <button
            onClick={runTest}
            disabled={!serverUrl}
            className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Start Test
          </button>
        ) : (
          <button
            onClick={stopTest}
            className="border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-500"
          >
            Stop
          </button>
        )}
        {status === 'running' && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{statusMsg}</span>
            {percentage > 0 && (
              <span className="text-xs text-gray-400">{Math.round(percentage)}%</span>
            )}
          </div>
        )}
      </div>

      {(downloadSamples.length > 0 || uploadSamples.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BandwidthChart title="Download" samples={downloadSamples} color="#3b82f6" />
          <BandwidthChart title="Upload" samples={uploadSamples} color="#10b981" />
        </div>
      )}

      {status === 'done' && (
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {results.downloadMbps !== undefined && (
              <Metric label="Download" value={results.downloadMbps.toFixed(1)} unit="Mbps" />
            )}
            {results.uploadMbps !== undefined && (
              <Metric label="Upload" value={results.uploadMbps.toFixed(1)} unit="Mbps" />
            )}
            {results.latencyMs !== undefined && (
              <Metric label="Latency" value={results.latencyMs.toFixed(0)} unit="ms" />
            )}
            {results.bufferbloatMs !== undefined && (
              <Metric label="Bufferbloat" value={results.bufferbloatMs.toFixed(0)} unit="ms" />
            )}
            {results.packetLossPct !== undefined && (
              <Metric label="Packet Loss" value={results.packetLossPct.toFixed(2)} unit="%" />
            )}
            {results.qualityScore !== undefined && (
              <Metric label="Score" value={results.qualityScore.toFixed(0)} unit="/100" />
            )}
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="border border-red-200 bg-red-50 rounded-lg p-4 text-sm text-red-700">
          {statusMsg || 'An error occurred during the test.'}
        </div>
      )}
    </div>
  )
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-3xl font-semibold tabular-nums">
        {value}
        <span className="text-base font-normal text-gray-500 ml-1">{unit}</span>
      </div>
    </div>
  )
}
