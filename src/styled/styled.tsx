import styled from '@emotion/styled';

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
  margin-left: 10px;
  cursor: pointer;
`;
export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  ::placeholder {
    color: #a9a9a9;
  }
`;
