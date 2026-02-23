import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import { LeftPanel } from '../../components/LeftPanel';
import { palette } from '../../cubicTheme';
import { analyseRepo, getRepoMetadata } from '../../services/DefaultService';
import { isValidGithubUrl } from '../../utils/githubUrl';
import { URLS } from '../../utils/urls';

export function Home() {
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isValidUrl = useMemo(() => isValidGithubUrl(repoUrl), [repoUrl]);

  const handleAnalyse = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const repoMetaData = await getRepoMetadata(repoUrl);
      const id = uuidv4();
      const { title, description } = repoMetaData;
      await analyseRepo(repoUrl, id, title, description);
      navigate(URLS.getResult(id));
      queryClient.invalidateQueries({ queryKey: ['QUERY_STRING_HISTORY'] })
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <LeftPanel />
      <Box sx={{ width: '70%', paddingLeft: '200px', display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Typography variant="h3">Repository Analyser</Typography>
        <TextField
          label="GitHub Repository URL"
          disabled={isLoading}
          variant="outlined"
          placeholder="https://github.com/username/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          error={repoUrl.length > 0 && !isValidUrl}
          helperText={
            repoUrl.length > 0 && !isValidUrl
              ? "Please enter a valid GitHub repository link"
              : ""
          }
          fullWidth
        />
        <Box>
          <Button
            variant="contained"
            color="primary"
            disabled={!isValidUrl || isLoading}
            onClick={handleAnalyse}
            size="large"
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? 'Analysing...' : 'Analyse'}
          </Button>
        </Box>
      </Box>
      {
        errorMessage && <Box sx={{ marginTop: 4, background: 'white', width: '70%', marginLeft: '200px' }}>
          <Typography color={palette.red} variant='h6'>{errorMessage}</Typography>
        </Box>
      }
    </Box>
  );
}
