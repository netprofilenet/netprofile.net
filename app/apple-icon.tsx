import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 36,
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
            fontSize: 124,
            color: 'white',
            letterSpacing: '-0.02em',
            marginTop: 10,
          }}
        >
          n
        </div>
        <div
          style={{
            position: 'absolute',
            top: 22,
            right: 28,
            width: 34,
            height: 34,
            borderRadius: 17,
            background: 'white',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
