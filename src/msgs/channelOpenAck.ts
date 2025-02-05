import { MsgChannelOpenAck } from '@initia/initia.js'
import { Height } from 'cosmjs-types/ibc/core/client/v1/client'
import { getChannelProof } from 'src/lib/proof'
import { ChainWorker } from 'src/workers/chain'
import { Transform } from 'src/lib/transform'

export async function generateMsgChannelOpenAck(
  srcPortId: string,
  srcChannelId: string,
  dstChain: ChainWorker,
  dstPortId: string,
  dstChannelId: string,
  height: Height,
  msgExecutor: string
): Promise<MsgChannelOpenAck> {
  const {
    channel: { version },
  } = await dstChain.rest.ibc.channel(dstPortId, dstChannelId)

  return new MsgChannelOpenAck(
    srcPortId,
    srcChannelId,
    dstChannelId,
    version,
    await getChannelProof(dstChain, dstPortId, dstChannelId, height),
    Transform.height(height),
    msgExecutor
  )
}
