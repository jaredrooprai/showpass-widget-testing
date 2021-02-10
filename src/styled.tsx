import styled from '@emotion/styled';

export const Title = styled.h5`
  margin: 20px 0 8px 0;
`;

export const Container = styled.div`
  padding: 20px;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Button = styled.button`
  padding: 5px 20px 5px 20px;
  cursor: pointer;
`;

export const ButtonSpacer = styled.div`
  width: 13px;
  height: 8px;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  ::placeholder {
    color: #a9a9a9;
  }
`;
