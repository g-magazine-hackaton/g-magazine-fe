import styled from '@emotion/styled';

export default function Homepage() {
  const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 240px;
    margin-bottom: 24px;
  `;

  return (
    <>
      <Box>컨텐츠 1</Box>
      <Box>컨텐츠 2</Box>
      <Box>컨텐츠 3</Box>
      <Box>컨텐츠 4</Box>
    </>
  );
}
