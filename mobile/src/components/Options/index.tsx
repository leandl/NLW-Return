import React from 'react';
import { View, Text } from 'react-native';

import { Copyright } from '../Copyright';
import { Option } from '../Option';

import { styles } from './styles';
import { FeedbackType, feedbackTypes } from "../../utils/feedbackTypes";

interface OptionsProps {
  onFeedbackTypeChanged(feedbackType: FeedbackType): void;
}

export function Options({ onFeedbackTypeChanged }: OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deixe seu feedback
      </Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, typeFeedback]) => (
          <Option 
            key={key} 
            title={typeFeedback.title} 
            image={typeFeedback.image} 
            onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
          />
        ))}
      </View>
      <Copyright />
    </View>
  );
}