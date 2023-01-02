import { useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { useState } from 'react';
import { Input } from '@components/Input';
import { Container, Content, Icon } from './styles';


export function NewGroup(){

  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  function handleNew(){
    navigation.navigate('players', { group })
  }

  return (
      <Container>
        <Header showBackButton />
        <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

         <Input
          keyboardAppearance="dark"
          placeholder="Nome da turma"
          onChangeText={setGroup}
         />
    
        <Button
          title="Criar"
          style={{marginTop: 15}} 
          onPress={handleNew}
        />
        </Content>
      </Container>
  )
}