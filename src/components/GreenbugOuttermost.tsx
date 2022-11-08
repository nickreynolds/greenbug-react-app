import styled from 'styled-components'
import { GreenbugPostEditor } from './GreenbugPostEditor';

const Container = styled.div`
    background-color: #73A657;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const MiddleLane = styled.div`
    background-color: #95bc80;
    max-width: 800px;
    @media (max-width: 768px) {
        width: 100h;
        max-width: 100h;
    }
    display: flex;
    flex-direction: column;
`
export function GreenbugOuttermost() {
    return (
        <Container>
            <MiddleLane>
                <GreenbugPostEditor />
            </MiddleLane>
        </Container>
    )
}