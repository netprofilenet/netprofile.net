import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontFamily: 'sans-serif',
            fontWeight: 700,
            fontSize: 22,
            color: 'white',
            letterSpacing: '-0.02em',
            marginTop: 2,
          }}
        >
          n
        </div>
        <div
          style={{
            position: 'absolute',
            top: 4,
            right: 5,
            width: 6,
            height: 6,
            borderRadius: 3,
            background: 'white',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
