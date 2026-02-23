import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Analysis } from '../../components/Analysis';
import { LeftPanel } from '../../components/LeftPanel';

export function Result() {
  const { resultId } = useParams();

  if (!resultId) {
    return (
      <Box>
        <LeftPanel />
        <Box sx={{ paddingLeft: '200px', paddingTop: 4 }}>
          <Typography variant="h5" color="error">
            Invalid URL. Please select a result from the history or search for a repository.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <LeftPanel />
      <Analysis resultId={resultId} />
    </Box>
  );
}