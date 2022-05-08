import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react';
import { captureScreen } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

import { FeedbackType, feedbackTypes } from '../../utils/feedbackTypes';
import { theme } from '../../theme';
import { api } from '../../libs/api';

import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

import { styles } from './styles';

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCanceled(): void;
  onFeedbackSent(): void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: FormProps) {
  const [comment, setComment] = useState<string>("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);

  const feedbackInfo = feedbackTypes[feedbackType];

  async function handleCaptureScreen() {
    const uriImage = await captureScreen({
      format: "png",
      quality: 0.8
    });

    setScreenshot(uriImage);
  }

  function handleScreenshotRemove() {
    setScreenshot(null)
  }

  async function handleSendFeedback() {
    if(isSendingFeedback) {
      return;
    }

    try {
      setIsSendingFeedback(true);

      const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: "base64" })

      await api.post("/feedbacks", {
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
        comment
      });

      onFeedbackSent();
    } catch(error) {
      console.log(error);
    } finally {
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft 
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            style={styles.image}
            source={feedbackInfo.image} 
          />
          <Text style={styles.titleText}>
            {feedbackInfo.title}
          </Text>
        </View>
      </View>

      <TextInput 
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton 
          screenshot={screenshot}
          onTakeScreenshot={handleCaptureScreen}
          onRemoveScreenshot={handleScreenshotRemove}
        />
        <Button 
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback} 
          disabled={comment.length === 0}
        />
      </View>
    </View>
  );
}