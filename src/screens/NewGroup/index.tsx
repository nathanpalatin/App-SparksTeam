import { useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

import { Container, Content, Icon } from './styles';


export function NewGroup(){

  const navigation = useNavigation();

  function handleNew(){
    navigation.navigate('players', { group: 'Meta 1'})
  }

  return (
      <Container>
        <Header showBackButton />
        <Content>

        <Icon />
        <Highlight title="Nova turma" subtitle="Crie a turma para adicionar as pessoas" />
         <Input keyboardAppearance="dark" placeholder="Nome da turma" />
    
        <Button title="Criar" 
          onPress={handleNew}
        />
        </Content>
      </Container>
  )
}