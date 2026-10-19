import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  /** HANDLERS **/

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"help-page"}>
      <Container className={"help-container"}>
        <Box className={"page-title"}>Help &amp; Support</Box>
        <Box className={"page-sub"}>
          Terms, frequently asked questions, and ways to reach us.
        </Box>

        <TabContext value={value}>
          <Tabs
            className={"help-tabs"}
            value={value}
            onChange={handleChange}
            variant={"scrollable"}
            scrollButtons={false}
            aria-label="help page tabs"
          >
            <Tab label="Terms" value={"1"} />
            <Tab label="FAQ" value={"2"} />
            <Tab label="Contact" value={"3"} />
          </Tabs>

          <Box className={"help-card"}>
            <TabPanel value={"1"} className={"help-tab-panel"}>
              <Stack className={"terms-list"}>
                {terms.map((value, number) => {
                  return (
                    <Box key={number} className={"terms-item"}>
                      <Box className={"terms-num"}>{number + 1}</Box>
                      <Box className={"terms-text"}>{value}</Box>
                    </Box>
                  );
                })}
              </Stack>
            </TabPanel>

            <TabPanel value={"2"} className={"help-tab-panel"}>
              <Stack className={"faq-list"}>
                {faq.map((value, number) => {
                  return (
                    <Accordion key={number} className={"faq-item"}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={"faq-question"}>
                          {value.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography className={"faq-answer"}>
                          {value.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Stack>
            </TabPanel>

            <TabPanel value={"3"} className={"help-tab-panel"}>
              <Stack className={"contact-grid"} flexDirection={"row"}>
                <Stack className={"contact-info"}>
                  <h3>Get in touch</h3>
                  <p>
                    Fill out the form and our team will get back to you
                    within one business day.
                  </p>
                  <Box className={"contact-row"}>
                    <Box className={"ic"}>
                      <PhoneIcon sx={{ fontSize: 16 }} />
                    </Box>
                    +1 (415) 555-0192
                  </Box>
                  <Box className={"contact-row"}>
                    <Box className={"ic"}>
                      <EmailIcon sx={{ fontSize: 16 }} />
                    </Box>
                    support@yasmincosmetics.com
                  </Box>
                  <Box className={"contact-row"}>
                    <Box className={"ic"}>
                      <AccessTimeIcon sx={{ fontSize: 16 }} />
                    </Box>
                    Mon&ndash;Sat, 9am&ndash;7pm
                  </Box>
                </Stack>

                <form action={"#"} method={"POST"} className={"contact-form"}>
                  <div className={"field"}>
                    <label>Your name</label>
                    <input
                      type={"text"}
                      name={"memberNick"}
                      placeholder={"Jane Doe"}
                    />
                  </div>
                  <div className={"field"}>
                    <label>Your email</label>
                    <input
                      type={"text"}
                      name={"memberEmail"}
                      placeholder={"jane@email.com"}
                    />
                  </div>
                  <div className={"field"}>
                    <label>Message</label>
                    <textarea
                      name={"memberMsg"}
                      placeholder={"How can we help?"}
                    ></textarea>
                  </div>
                  <Box className={"send-box"}>
                    <Button className={"send-btn"} type={"submit"}>
                      Send
                    </Button>
                  </Box>
                </form>
              </Stack>
            </TabPanel>
          </Box>
        </TabContext>
      </Container>
    </div>
  );
}
