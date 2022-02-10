import styled from 'styled-components';
import { RoomsContainer } from './RoomsContainers';
import { MessagesContainer } from './MessagesContainer';

export const Forum = () => {
  return (
    <Page>
      <RoomsContainer />
      <MessagesContainer />
    </Page>
  );
};

const Page = styled.div`
  display: flex;

  button {
    color: white;
    background-color: black;
  }
`;
