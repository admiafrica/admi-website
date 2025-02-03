import React from 'react';
import { Box, Card, Image, Text } from '@mantine/core';

import { Title } from '../ui';

type Props = {
  advice: any;
};

export default function UserCareerCard(props: Props) {
  return (
    <Card className="z-10 mx-4 w-[680px] shadow-md" withBorder>
      <Box className="flex flex-row">
        <Box className="flex w-1/2 flex-col">
          <Title label={props.advice.title} color="black" size="24px" />
          <div className="font-proxima">
            <Text size="16px">{props.advice.description}</Text>
          </div>
        </Box>
        <Box className="flex w-1/2">
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            alt="about course"
            height={'100%'}
            style={{ borderRadius: 8 }}
          />
        </Box>
      </Box>
    </Card>
  );
}
