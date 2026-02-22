import {
  Divider, List,
  ListItem,
  ListItemButton, ListItemText,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../utils/urls";

type Props = {
  searchHistory: {
    id: string,
    title: string
  }[]
}

export function History({ searchHistory }: Props) {

  const navigate = useNavigate();

  return (
    <>
      <Divider />
      <List>
        <ListItem>
          <Typography variant="h6">History</Typography>
        </ListItem>
        {searchHistory.map(({ id, title }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton onClick={() => {
              navigate(URLS.getResult(id))
            }}>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
