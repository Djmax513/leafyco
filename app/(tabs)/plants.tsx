import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';

import { PageContainer } from '~/components/themed/PageContainer';

export default function Plants() {
  return (
    <>
      <ScrollView>
        <PageContainer>
          <Text>Lista de plantas</Text>
        </PageContainer>
      </ScrollView>
    </>
  );
}
