import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";

export const SandboxPage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Stack spacing={4} sx={{ py: 4 }}>
      <section>
        <Typography variant="h4" gutterBottom>
          Typography
        </Typography>
        <Stack spacing={2}>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="h6">Heading 6</Typography>
          <Typography variant="subtitle1">Subtitle 1</Typography>
          <Typography variant="subtitle2">Subtitle 2</Typography>
          <Typography variant="body1">
            Body 1 text with some content to show how it wraps and flows on the
            page.
          </Typography>
          <Typography variant="body2">
            Body 2 text with some content to show how it wraps and flows on the
            page.
          </Typography>
          <Typography variant="button">Button Text</Typography>
          <Typography variant="caption">Caption Text</Typography>
          <Typography variant="overline">Overline Text</Typography>
        </Stack>
      </section>

      <section>
        <Typography variant="h4" gutterBottom>
          Buttons
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Button variant="contained" sx={{ m: 1 }}>
              Contained Primary
            </Button>
            <Button variant="contained" color="secondary" sx={{ m: 1 }}>
              Contained Secondary
            </Button>
            <Button variant="contained" color="error" sx={{ m: 1 }}>
              Contained Error
            </Button>
          </Box>
          <Box>
            <Button variant="outlined" sx={{ m: 1 }}>
              Outlined Primary
            </Button>
            <Button variant="outlined" color="secondary" sx={{ m: 1 }}>
              Outlined Secondary
            </Button>
            <Button variant="outlined" color="error" sx={{ m: 1 }}>
              Outlined Error
            </Button>
          </Box>
          <Box>
            <Button variant="text" sx={{ m: 1 }}>
              Text Primary
            </Button>
            <Button variant="text" color="secondary" sx={{ m: 1 }}>
              Text Secondary
            </Button>
            <Button variant="text" color="error" sx={{ m: 1 }}>
              Text Error
            </Button>
          </Box>
        </Stack>
      </section>

      <section>
        <Typography variant="h4" gutterBottom>
          Toggle Buttons
        </Typography>
        <Stack spacing={2}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              Left
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              Center
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              Right
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </section>

      <section>
        <Typography variant="h4" gutterBottom>
          Form Controls
        </Typography>
        <Stack spacing={2} maxWidth={400}>
          <TextField label="Standard" />
          <TextField label="Outlined" variant="outlined" />
          <TextField label="Filled" variant="filled" />
          <Select value={1} label="Select">
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <MenuItem value={3}>Option 3</MenuItem>
          </Select>
          <FormControlLabel control={<Checkbox />} label="Checkbox" />
          <RadioGroup defaultValue="1">
            <FormControlLabel value="1" control={<Radio />} label="Radio 1" />
            <FormControlLabel value="2" control={<Radio />} label="Radio 2" />
          </RadioGroup>
        </Stack>
      </section>

      <section>
        <Typography variant="h4" gutterBottom>
          Navigation
        </Typography>
        <Stack spacing={2}>
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
            <Tab label="Tab 1" />
            <Tab label="Tab 2" />
            <Tab label="Tab 3" />
          </Tabs>
          <Breadcrumbs>
            <Link color="inherit" href="#">
              Home
            </Link>
            <Link color="inherit" href="#">
              Category
            </Link>
            <Typography color="textPrimary">Current</Typography>
          </Breadcrumbs>
        </Stack>
      </section>

      <section>
        <Typography variant="h4" gutterBottom>
          Data Display
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Card Title</Typography>
                <Typography variant="body2">
                  Card content with some description text.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <List>
              <ListItem>
                <ListItemText
                  primary="List Item 1"
                  secondary="Secondary text"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="List Item 2"
                  secondary="Secondary text"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Header 1</TableCell>
                  <TableCell>Header 2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Cell 1</TableCell>
                  <TableCell>Cell 2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cell 3</TableCell>
                  <TableCell>Cell 4</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </section>

      <section>
        <Typography variant="h4" gutterBottom>
          Feedback
        </Typography>
        <Stack spacing={2}>
          <Alert severity="success">Success Alert</Alert>
          <Alert severity="info">Info Alert</Alert>
          <Alert severity="warning">Warning Alert</Alert>
          <Alert severity="error">Error Alert</Alert>
          <LinearProgress />
          <Box sx={{ display: "flex", gap: 2 }}>
            <CircularProgress />
            <CircularProgress color="secondary" />
          </Box>
        </Stack>
      </section>

      <section>
        <Typography variant="h4" gutterBottom>
          Surfaces
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 4, 8, 16, 24].map((elevation) => (
            <Grid item key={elevation} xs={6} sm={4} md={2}>
              <Paper
                elevation={elevation}
                sx={{
                  p: 2,
                  textAlign: "center",
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>Elevation {elevation}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </section>
    </Stack>
  );
};
