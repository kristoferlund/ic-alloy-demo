import { Link, createLazyFileRoute } from '@tanstack/react-router'

import { backend } from '../../backend/declarations'
import { useQuery } from '@tanstack/react-query'
import Source from '../components/source'

export const Route = createLazyFileRoute('/send_eth_with_fillers')({
  component: Page,
})

function Page() {
  const {
    data: txResult,
    isFetching: isSendingTx,
    refetch: resendTx,
  } = useQuery({
    queryKey: ['send_eth_with_fillers'],
    queryFn: () => backend.send_eth_with_fillers(),
    enabled: false,
  })

  return (
    <>
      <Link to="/">
        <button> Menu</button>
      </Link>
      <div className="card">
        <p>Send 100 wei from the canister eth address to, for the purposes of this demo, back to the canister eth address.</p>
        <p><i>If call fails due to lack of funds, top up the canister eth address with some SepoliaEth.</i></p>
        <p><i>Using Alloy fillers sends multiple requests to the RCP. This canister call can take up to a minute to complete, please be patient.</i></p>
        <button onClick={() => void resendTx()}>
          {isSendingTx ? 'Requesting…' : 'send_eth_with_fillers()'}
        </button>
        {txResult && <pre>{JSON.stringify(txResult, null, 2)}</pre>}
        <Source file='send_eth_with_fillers.rs' />
      </div>
    </>
  )
}
