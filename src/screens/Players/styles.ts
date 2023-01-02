import styled, { css } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.GRAY_600};

  padding: 24px;
`;

export const Form = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.COLORS.GRAY_700};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
`;

export const HeaderList = styled.View`
  flex-direction: row;
  width: 100%;
  margin: 32px 0 12px;
`;

export const NumbersOfPlayers = styled.Text`
  ${({theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
  `};
`;