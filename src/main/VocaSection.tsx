import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Card from '../module/Card';
import styles from '../styles/VocaSectionStyle';

function VocaSection() {
  const levels = [1, 2, 3, 4, 5, 6];
  return (
    <View>
      <Text style={styles.sectionText}>HSK 단어</Text>
      <View style={styles.cardsWrapper}>
        {levels.map(k => (
          <TouchableOpacity key={k}>
            <Card>
              <View style={styles.contents}>
                <View style={styles.whiteDot} />
                <Text style={styles.levelText}>{`${k} 급`}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
      <Card>
        <View style={styles.scrap}>
          <Text style={styles.scrapText}>내 단어장</Text>
          <Image
            style={styles.scrapImg}
            source={require('../../images/lanternOn.png')}
          />
        </View>
      </Card>
    </View>
  );
}

export default VocaSection;
