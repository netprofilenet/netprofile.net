'use client'

import { useEffect, useRef } from 'react'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler)

interface Sample {
  t: number
  v: number
}

interface Props {
  title: string
  samples: Sample[]
  color: string
}

export default function BandwidthChart({ title, samples, color }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  // Create chart
  useEffect(() => {
    if (!canvasRef.current) return

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: title,
          data: [],
          borderColor: color,
          backgroundColor: color + '20',
          fill: true,
          tension: 0.3,
          pointRadius: 0,
        }],
      },
      options: {
        animation: false,
        scales: {
          x: { display: false },
          y: {
            min: 0,
            ticks: { callback: (v) => `${v} Mbps` },
          },
        },
        plugins: {
          legend: { display: false },
        },
      },
    })

    return () => {
      chartRef.current?.destroy()
      chartRef.current = null
    }
  }, [color, title])

  // Update data
  useEffect(() => {
    if (!chartRef.current) return
    chartRef.current.data.labels = samples.map(s => (s.t / 1000).toFixed(1) + 's')
    chartRef.current.data.datasets[0].data = samples.map(s => s.v)
    chartRef.current.update('none')
  }, [samples])

  return (
    <div className="border border-neutral-200 rounded-lg p-4">
      <div className="text-sm font-medium text-neutral-500 mb-3">{title}</div>
      <canvas ref={canvasRef} height={120} />
    </div>
  )
}
