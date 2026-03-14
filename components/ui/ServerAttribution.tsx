export default function ServerAttribution({
  serverName,
  serverId,
  serverCity,
  serverCountry,
  hostOrg,
  hostUrl,
}: {
  serverName?: string
  serverId: string
  serverCity?: string
  serverCountry?: string
  hostOrg?: string
  hostUrl?: string
}) {
  const location = [serverCity, serverCountry].filter(Boolean).join(', ')

  return (
    <div className="text-sm text-neutral-500">
      Tested against{' '}
      <span className="font-medium text-neutral-700">{serverName || serverId}</span>
      {location && <> in {location}</>}
      {hostOrg && (
        <>
          {' '}hosted by{' '}
          {hostUrl ? (
            <a
              href={hostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-700 underline underline-offset-2 hover:text-black"
            >
              {hostOrg}
            </a>
          ) : (
            <span className="font-medium text-neutral-700">{hostOrg}</span>
          )}
        </>
      )}
    </div>
  )
}
