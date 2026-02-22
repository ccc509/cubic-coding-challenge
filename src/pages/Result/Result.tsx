import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Analysis } from '../../components/Analysis';
import { LeftPanel } from '../../components/LeftPanel';

export function Result() {

  const { resultId } = useParams();

  return (
    <Box>
      <LeftPanel />
      {
        resultId && <Analysis resultId={resultId} />
      }
    </Box>
  );
}