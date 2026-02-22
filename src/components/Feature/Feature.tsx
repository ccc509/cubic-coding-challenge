import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import type { Feature } from '../../utils/types';

type Props = {
  feature: Feature
}

export function Feature({ feature }: Props) {

  const { name, description } = feature;

  return (<Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      <Typography component="span">{name}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {description}
    </AccordionDetails>
  </Accordion>)
}