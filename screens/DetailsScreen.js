import * as React from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { View, Image } from 'react-native';

export default function DetailsScreen() {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Cover source={require('../assets/img/Cristiano_Ronaldo.jpg')} />
      <Card.Content>
        <Title>Lizard</Title>
        <Paragraph>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>Share</Button>
      </Card.Actions>
    </Card>
  );
}
