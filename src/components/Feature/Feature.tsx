import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Link, Typography } from "@mui/material";
import type { Feature } from '../../utils/types';

type Props = {
  feature: Feature
}

export function Feature({ feature }: Props) {

  const { name, description, entryPoints = [] } = feature;

  return (<Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      <Typography component="span">{name}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography variant='body1'>{description}</Typography>
      {
        entryPoints.map(({ name: entryName, link }, index) => (
          <Box key={`${entryName}-${index}`} sx={{ paddingTop: 2 }}>
            <Typography variant='h6'>{entryName}</Typography>
            <Link href={link} underline="none">
              {link}
            </Link>
          </Box>
        ))
      }
    </AccordionDetails>
  </Accordion>)
}