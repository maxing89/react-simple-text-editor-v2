import React, { useState } from 'react';
import { message } from 'antd';
import Header from './Header';
import FileZone from './FileZone';
import {
    convertTextIntoArray,
    changeWordFormat,
    changeSelectedWordFormat,
    replaceWordWithSynonym,
    changeSelectedWordValue,
} from '../helpers';
import dataMuseAPI from '../api/api';
import { AppWrapper } from './styles'
import { Word, Synonym, Format } from '../types';
 
const TextEditorContainer: React.FC = () => {
  const defaultFormat: Format = {
    bold: false,
    italic: false,
    underline: false,
    color: '#000000',
  };

  const [inputText, setInputText] = useState<Word[] | null>([]);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);
  const [loadingSynonyms, setLoadingSynonyms] = useState<boolean>(false);

  const getSynonyms = (selectedWord: Word) => {
    setLoadingSynonyms(true);

    dataMuseAPI.fetchWordSynonyms(selectedWord.value)
      .then((synonyms) => {
        setSynonyms(synonyms);
        setLoadingSynonyms(false);
      })
      .catch(() => {
        setSynonyms([]);
        setLoadingSynonyms(false);
        message.error('Error while fetching synonyms')
      });
  }

  const handleOnChangeFormat = (checked: boolean, format: string) => {
    if (selectedWord) {
      const modifiedText = changeWordFormat(inputText ? inputText : [], selectedWord, checked, format);
      const modifiedSelectedWord = changeSelectedWordFormat(selectedWord, checked, format);
      setInputText(modifiedText);
      setSelectedWord(modifiedSelectedWord);
    } else {
      message.error('You must select a word to change its format!')
    }
  }

  const handleSubmit = (text: string) => {
    const arrayOfWords = convertTextIntoArray(text);
    setInputText(arrayOfWords);
  }

  const handleReset = () => {
    setInputText(null);
    setSelectedWord(null);
    setSynonyms([]);
  }

  const handleOnSelection = (selectedWord: Word) => {
    setSelectedWord(selectedWord);
    getSynonyms(selectedWord);
  }

  const handleUnSelect = () => {
    setSelectedWord(null);
  }

  const handleSelectSynonym = (synonym: Synonym) => {
    const modifiedText = replaceWordWithSynonym(inputText ? inputText : [], selectedWord as Word, synonym);
    const modifiedSelectedWord = changeSelectedWordValue(selectedWord as Word, synonym);
    setInputText(modifiedText);
    setSelectedWord(modifiedSelectedWord);
  }

  return (
    <AppWrapper>
      <Header 
        onChangeFormat={handleOnChangeFormat}
        format={selectedWord ? selectedWord.format : defaultFormat}
        loadingSynonyms={loadingSynonyms}
        synonyms={synonyms}
        selectedWord={selectedWord}
        onSelectSynonym={handleSelectSynonym}
      />
      <FileZone
        onSubmit={handleSubmit}
        onReset={handleReset}
        onSelection={handleOnSelection}
        onClick={handleUnSelect}
        words={inputText} />
    </AppWrapper>
  )
}

export default TextEditorContainer