import styled, { css } from 'styled-components/native';
import {TouchableOpacity } from 'react-native';

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECUNDARY';

type Props = {
  type: ButtonTypeStyleProps;
}

export const Container = styled(TouchableOpacity) <Props>`
  min-height: 56px;
  min-width: 56px;
  width: 100%;
  margin: 20px 0;
  background-color: ${({ theme, type }) => type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

  border-radius: 6px;

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.BOLD};
    `};
`;