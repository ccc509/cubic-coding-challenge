import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAnalysis } from "../../services/DefaultService";
import { QUERY_STRING_ANALYSIS } from "../../utils/constants";
import { Feature } from "../Feature";

type Props = {
  resultId: string
}

export function Analysis({ resultId }: Props) {

  const { data, isLoading } = useQuery(
    {
      queryKey: [QUERY_STRING_ANALYSIS, resultId],
      queryFn: () => getAnalysis(resultId)
    }
  );

  return (<>
    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 2 }}>
      {
        isLoading && <CircularProgress />
      }
      {
        data && <Box>
          <Typography variant="h5">{data.title}</Typography>
          {
            data.features.map((feature) => {
              return <Feature feature={feature} />
            })
          }
        </Box>}
    </Box>
  </>)
}