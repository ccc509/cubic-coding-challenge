import { Box, Button, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { LeftPanel } from '../../components/LeftPanel';

export function Home() {

  const [repoUrl, setRepoUrl] = useState<string>('');

  const isValidGithubUrl = useMemo(() => {
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+\/?$/;
    const cleanUrl = repoUrl.replace(/\.git$/, '');

    return githubRegex.test(cleanUrl);
  }, [repoUrl]);

  const handleAnalyse = () => {
    console.log("Analysing repository:", repoUrl);
  };

  return (
    <Box>
      <LeftPanel />
      <Box sx={{ minWidth: '500px', display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Typography variant="h6">Repository Analyser</Typography>
        <TextField
          label="GitHub Repository URL"
          variant="outlined"
          placeholder="https://github.com/username/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          error={repoUrl.length > 0 && !isValidGithubUrl}
          helperText={
            repoUrl.length > 0 && !isValidGithubUrl
              ? "Please enter a valid GitHub repository link"
              : ""
          }
          fullWidth
        />
        <Box>
          <Button
            variant="contained"
            color="primary"
            disabled={!isValidGithubUrl}
            onClick={handleAnalyse}
            size="large"
          >
            Analyse
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
