import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Text,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Collatz3D from '../components/Collatz3D';
import axios from 'axios';

interface SequenceResponse {
  sequence: number[];
  steps: number;
  max_value: number;
}

export default function Home() {
  const [number, setNumber] = useState<string>('');
  const [sequence, setSequence] = useState<SequenceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const calculateSequence = async () => {
    if (!number || isNaN(Number(number)) || Number(number) <= 0) {
      toast({
        title: 'Invalid input',
        description: 'Please enter a positive number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post<SequenceResponse>(`${process.env.NEXT_PUBLIC_API_URL}/sequence`, {
        start_number: Number(number)
      });
      setSequence(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to calculate sequence',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const chartData = sequence?.sequence.map((value, index) => ({
    step: index,
    value,
  }));

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <Heading>Syracuse Conjecture Visualizer</Heading>
        
        <Box w="full" maxW="md">
          <Input
            placeholder="Enter a positive number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            size="lg"
          />
          <Button
            mt={4}
            colorScheme="blue"
            onClick={calculateSequence}
            isLoading={loading}
            w="full"
          >
            Calculate Sequence
          </Button>
        </Box>

        {sequence && (
          <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
            <GridItem>
              <Card>
                <CardBody>
                  <Stat>
                    <StatLabel>Steps</StatLabel>
                    <StatNumber>{sequence.steps}</StatNumber>
                    <StatHelpText>Total iterations</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card>
                <CardBody>
                  <Stat>
                    <StatLabel>Maximum Value</StatLabel>
                    <StatNumber>{sequence.max_value}</StatNumber>
                    <StatHelpText>Highest number reached</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card>
                <CardBody>
                  <Stat>
                    <StatLabel>Final Value</StatLabel>
                    <StatNumber>{sequence.sequence[sequence.sequence.length - 1]}</StatNumber>
                    <StatHelpText>Last number in sequence</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        )}

        {sequence && (
          <Tabs isFitted variant="enclosed" w="full">
            <TabList mb="1em">
              <Tab>2D Visualization</Tab>
              <Tab>3D Visualization</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box h="500px" w="full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="step" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </TabPanel>
              <TabPanel>
                <Collatz3D sequence={sequence.sequence} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </VStack>
    </Container>
  );
} 