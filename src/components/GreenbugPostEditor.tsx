import { useState } from 'react';
import styled from 'styled-components'
import { agent } from '../veramo/setup';
import GreenbugSlateEditor from './slate/GreenbugSlateEditor';
import * as IPFS from 'ipfs-core'


const Container = styled.div`
    background-color: #73A657;
`;

const Text = styled.textarea`

`;

export function GreenbugPostEditor() {
    const [text, setText] = useState("")
    return (
        <Container>
            <GreenbugSlateEditor onPost={async (post: any) => {
                // const ipfs = await IPFS.create()
                // console.log("post: ", post)
                // const { cid } = await ipfs.add('what')
                // console.info(cid)
                const did = localStorage.getItem('did')!
                console.log("did: ", did)
                const id = await agent.didManagerGet({ did })
                console.log("id: ", id)

                const resolvedDID = await agent.resolveDid({ didUrl: did })
                console.log("resolvedDID: ", resolvedDID)

                const cred = {
                    issuer: { id: localStorage.getItem('did') || '' },
                    type: ["VerifiableCredential", "GreenbugPostV1"],
                    credentialSubject: {
                        post: {
                            storage: 'ipfs',
                            cid: 'something'
                        }
                    }
                }
                console.log("cred: ", cred)
                const vCred = await agent.createVerifiableCredential({ 
                    credential: cred, 
                    proofFormat: 'jwt'
                })
                console.log("vCred: ", vCred)
            }} />
        </Container>
    )
}