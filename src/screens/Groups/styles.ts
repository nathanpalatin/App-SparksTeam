import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  padding: 24px;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE };
  font-size: ${({ theme }) => theme.FONT_SIZE.SM};
`;