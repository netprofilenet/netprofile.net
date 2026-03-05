import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Getting Started — netprofile docs',
  description: 'Install the netprofile test server and run your first network quality test.',
}

export default function GettingStarted() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose prose-sm">
      <h1>Getting Started</h1>

      <h2>1. Run the server</h2>
      <pre><code>{`docker run -p 3000:3000 ghcr.io/netprofile/qoe:latest`}</code></pre>
      <p>Or build from source:</p>
      <pre><code>{`git clone https://github.com/netprofilenet/qoe-go-server
cd qoe-go-server
go build -o bin/qoe-server ./cmd/qoe-server
./bin/qoe-server`}</code></pre>

      <h2>2. Run a test in the browser</h2>
      <p>
        Open <a href="http://localhost:3000">http://localhost:3000</a> for the
        built-in test UI, or visit the{' '}
        <a href="/speedtest">netprofile speed test</a> page and enter your
        server URL.
      </p>

      <h2>3. Use the JS library</h2>
      <pre><code>{`npm install @netprofile/qoe-js

import { QOEClient } from '@netprofile/qoe-js'

const client = new QOEClient()
client.setServer({
  httpUrl: 'http://localhost:3000',
  webrtcSignalingUrl: 'ws://localhost:3000/signaling',
  stunServers: ['stun:stun.l.google.com:19302'],
  // ... other ServerInfo fields
})
const results = await client.runQualityTest()
console.log('Download:', results.download.bandwidthMbps, 'Mbps')`}</code></pre>

      <h2>4. Use the Go library</h2>
      <pre><code>{`go get github.com/netprofile/qoe-go

import qoe "github.com/netprofile/qoe-go"

client := qoe.NewClient()
client.DiscoverBestServer("config/servers.json")
results, _ := client.RunQualityTest(context.Background())
fmt.Printf("%.1f Mbps down\\n", results.Download.BandwidthMbps)`}</code></pre>

      <h2>5. Use the CLI</h2>
      <pre><code>{`go install github.com/netprofile/qoe-go/cmd/qoe@latest

qoe test --mode=quality --server=http://localhost:3000`}</code></pre>
    </div>
  )
}
