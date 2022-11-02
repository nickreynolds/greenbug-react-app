import { useState } from 'react';
import styled from 'styled-components'
import { agent } from '../veramo/setup';

const Container = styled.div`
    background-color: #73A657;
`;

const Text = styled.textarea`

`;

export function GreenbugPostEditor() {
    const [text, setText] = useState("")
    return (
        <Container>
            <form onSubmit={async (e) => {
                e.preventDefault()
                const did = localStorage.getItem('did')!
                console.log("did: ", did)
                const id = await agent.didManagerGet({ did })
                console.log("id: ", id)

                const resolvedDID = await agent.resolveDid({ didUrl: did })
                console.log("resolvedDID: ", resolvedDID)

                const cred = {
                    issuer: { id: localStorage.getItem('did') || '' },
                    credentialSubject: {
                        post: text
                    }
                }
                console.log("cred: ", cred)
                const vCred = await agent.createVerifiableCredential({ 
                    credential: cred, 
                    proofFormat: 'lds'
                })
                console.log("vCred: ", vCred)
            }}>
            <label>
                Name:
                <Text value={text} onChange={(e) => setText(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
            </form>
        </Container>
    )
}