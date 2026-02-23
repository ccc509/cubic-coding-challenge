import SearchIcon from '@mui/icons-material/Search';
import {
  Box, CircularProgress, Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../../services/DefaultService";
import { QUERY_STRING_HISTORY } from "../../utils/constants";
import { URLS } from "../../utils/urls";
import { History } from "./History";

export function LeftPanel() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    {
      queryKey: [QUERY_STRING_HISTORY],
      queryFn: () => getHistory()
    }
  );

  return (
    <Drawer variant="permanent">
      <Box sx={{ width: '200px' }}>
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate(URLS.SEARCH)}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary='Search' />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 2 }}>
          {
            isLoading && <CircularProgress />
          }
        </Box>
        {
          data && !!data.length && <History searchHistory={data} />
        }
      </Box>
    </Drawer>
  );
}
