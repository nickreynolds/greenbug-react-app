import { VerifiableCredential } from '@veramo/core';
import { useState } from 'react';
import styled from 'styled-components'
import { agent } from '../veramo/setup';

const Container = styled.div`
    background-color: #73A657;
`;

const Text = styled.textarea`

`;

export function GreenbugPostEditor(props: { vCred: VerifiableCredential }) {
    return (
        <Container>
            cred.
        </Container>
    )
}