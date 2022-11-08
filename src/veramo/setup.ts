import { createAgent, ICredentialPlugin, IDIDManager, IKeyManager, IMessageHandler, IResolver } from '@veramo/core'
import { ICredentialIssuerEIP712 } from '@veramo/credential-eip712'
import { CredentialIssuerEIP712 } from '@veramo/credential-eip712/build/agent/CredentialEIP712.js'
import { CredentialIssuerLD, ICredentialIssuerLD } from '@veramo/credential-ld'
import { CredentialPlugin } from '@veramo/credential-w3c'
import { LdDefaultContexts } from '@veramo/credential-ld/build/ld-default-contexts.js'
import { VeramoEcdsaSecp256k1RecoverySignature2020 } from '@veramo/credential-ld/build/suites/EcdsaSecp256k1RecoverySignature2020.js'
import { VeramoEd25519Signature2018 } from '@veramo/credential-ld/build/suites/Ed25519Signature2018.js'
import { KeyStoreJson } from '@veramo/data-store-json'
import { BrowserLocalStorageStore } from '@veramo/data-store-json'
import { DIDStoreJson } from '@veramo/data-store-json'
import { PrivateKeyStoreJson } from '@veramo/data-store-json'
import { DataStoreJson } from '@veramo/data-store-json/build/data-store-json.js'
import { DIDComm, DIDCommHttpTransport } from '@veramo/did-comm'
import { DIDManager } from '@veramo/did-manager'
import { EthrDIDProvider } from '@veramo/did-provider-ethr'
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { AbstractKeyManagementSystem, KeyManager } from '@veramo/key-manager'
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'
// import { MessageHandler } from '@veramo/message-handler'


import { Resolver } from 'did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'

import { contexts as credential_contexts } from '@transmute/credentials-context'

// You will need to get a project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = '3586660d179141e3801c3895de1c2eba'
const KMS_SECRET_KEY = '059691f1abbd5a60203117246dd0dd8172778f088d2b45e1dbe96635ce570f56'
const dataStore = BrowserLocalStorageStore.fromLocalStorage('veramo-state')
const id = "greenbug-agent"
export const agent = createAgent<
IDIDManager &
  IKeyManager &
  IResolver &
  ICredentialPlugin &
  IMessageHandler
>({
context: {
  id,
  name: `greenbug-user`,
},
plugins: [
  new DIDResolverPlugin({
    resolver: new Resolver({
      ethr: ethrDidResolver({
        INFURA_PROJECT_ID,
        networks: [
          {
            name: 'mainnet',
            chainId: 1,
            rpcUrl: 'https://mainnet.infura.io/v3/' + INFURA_PROJECT_ID,
          },
        ],
      }).ethr,
      web: webDidResolver().web,
    }),
  }),
  new KeyManager({
    store: new KeyStoreJson(dataStore),
    kms: {
      local: new KeyManagementSystem(new PrivateKeyStoreJson(dataStore, new SecretBox(KMS_SECRET_KEY))),
    },
  }),
  new DIDManager({
    store: new DIDStoreJson(dataStore),
    defaultProvider: 'did:ethr',
    providers: {
        'did:ethr': new EthrDIDProvider({
            defaultKms: 'local',
            ttl: 60 * 60 * 24 * 30 * 12 + 1,
            networks: [
              {
                name: 'mainnet',
                rpcUrl: 'https://mainnet.infura.io/v3/' + INFURA_PROJECT_ID,
              }
            ]
        })
    },
  }),
  new CredentialPlugin(),
  new CredentialIssuerLD({
    contextMaps: [LdDefaultContexts, credential_contexts as any],
    suites: [new VeramoEcdsaSecp256k1RecoverySignature2020(), new VeramoEd25519Signature2018()],
  }),
//   new CredentialIssuerEIP712(),
  new DataStoreJson(dataStore),
//   new MessageHandler({
//     messageHandlers: [
//     //   new DIDCommMessageHandler(),
//       new JwtMessageHandler(),
//       new W3cMessageHandler(),
//     //   new SdrMessageHandler(),
//     ],
//   }),
  new DIDComm([
    new DIDCommHttpTransport(),
  ]),
],
})