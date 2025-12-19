import React from "react";
import { Box, Container, TextField } from "@mui/material";
import { AdminNavBar } from "../components/AdminNavBar";
import { Typography, Button } from "@mui/material";
import { NavBar } from "../components/NavBar";

const AboutPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        bgcolor: "primary.main",
      }}
    >
      <NavBar sx={{ position: "relative", zIndex: 3 }} />
      <Box
        sx={{
          flex: 1,
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          mt: "12rem",
          mb: "12rem",

          gap: 2,
          mx: "17rem",
        }}
      >
        <Typography mb="3rem" variant="h4" fontSize={36}>
          FEUM
        </Typography>
        <Typography
          mb="10rem"
          sx={{ mx: "13rem", fontSize: 16 }}
          variant="body2"
          textAlign={"center"}
        >
          An association for Electronic Underground Music, based in Aarhus,
          Denmark. FEUM is a non-profit organization supporting, creating and
          promoting electronic underground music.
        </Typography>
        <Typography
          sx={{ mx: "13rem", fontSize: 22 }}
          variant="body2"
          textAlign={"center"}
        >
          SAFER SPACE MISSION
        </Typography>
        <Typography
          sx={{ mb: "10rem", mx: "10rem", fontSize: 14, fontWeight: "400" }}
          variant="body2"
          textAlign={"center"}
        >
          We wish to create an inclusive environment at our events where
          everyone feels comfortable and respected, regardless of their race,
          gender, sexual orientation, religion, or any other characteristic.{" "}
          <br />
          <br />
          We have set of house rules and guidelines to ensure that our guests
          can enjoy themselves without fear of discrimination, harassment, or
          other harmful behaviours. These rules are designed to promote a sense
          of community and respect, while also setting clear expectations for
          appropriate behaviour. <br />
          <br />
          Before attending our events, please take the time to read our
          guidelines and house rules.
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            mt: 4,
            gap: 2,
          }}
        >
          {/* Left column */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              pr: 8,
              borderRight: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            <Typography
              letterSpacing={"4"}
              fontWeight={"400"}
              mb="4rem"
              variant="h4"
              fontSize={28}
            >
              Our House Rules
            </Typography>
            <Typography
              sx={{
                textTransform: "uppercase",
                mb: "1rem",
                fontSize: 16,
                fontWeight: "400",
              }}
              variant="body2"
              textAlign={"center"}
            >
              HARASSMENT-FREE ENVIRONMENT ✮ 👙
            </Typography>
            <Typography
              sx={{ mb: "3rem", fontSize: 14, fontWeight: "400" }}
              variant="body2"
              textAlign={"center"}
            >
              All of us should feel safe and welcome, regardless of our race,
              gender, sexuality, ethnicity, or ways of self-expression. We have
              zero-tolerance for any for of harassment or abuse. In case of
              discomfort, our crew and security are ready to help. Please find
              us at the entrance or at the bar or contact us on instagram
              @feum_dk
            </Typography>
            <Typography
              sx={{
                textTransform: "uppercase",
                mb: "1rem",
                fontSize: 16,
                fontWeight: "400",
              }}
              variant="body2"
              textAlign={"center"}
            >
              NO FILMING OR PHOTOS ✾
            </Typography>
            <Typography
              sx={{ mb: "3rem", fontSize: 14, fontWeight: "400" }}
              variant="body2"
              textAlign={"center"}
            >
              We want everyone to express themselves freely. Filming and taking
              photos on the dancefloor can make people very uncomfortable,
              please limit the use of your phone on the dancefloor and don’t
              film or take photos.
            </Typography>
            <Typography
              sx={{
                textTransform: "uppercase",
                mb: "1rem",
                fontSize: 16,
                fontWeight: "400",
              }}
              variant="body2"
              textAlign={"center"}
            >
              Please Smoke Outside ✺ 🚬
            </Typography>
            <Typography
              sx={{ mb: "3rem", fontSize: 14, fontWeight: "400" }}
              variant="body2"
              textAlign={"center"}
            >
              Smoking is prohibited in the kitchen and on the dance floor. Keep
              in mind non-smokers in and out of the venue.
            </Typography>
            <Typography
              sx={{
                textTransform: "uppercase",
                mb: "1rem",
                fontSize: 16,
                fontWeight: "400",
              }}
              variant="body2"
              textAlign={"center"}
            >
              NO DRUGS POLICY ❀ 💊
            </Typography>
            <Typography
              sx={{ mb: "3rem", fontSize: 14, fontWeight: "400" }}
              variant="body2"
              textAlign={"center"}
            >
              We do not condone or promote their use but we recognise that some
              people still choose to use them. If you’re going to take drugs
              then please be safe, know your boundaries and be mindful of those
              around you.
            </Typography>
            <Typography
              sx={{
                textTransform: "uppercase",
                mb: "1rem",
                fontSize: 16,
                fontWeight: "400",
              }}
              variant="body2"
              textAlign={"center"}
            >
              Leave no trace and respect the venue ♡ 🌐
            </Typography>
            <Typography
              sx={{ mb: "3rem", fontSize: 14, fontWeight: "400" }}
              variant="body2"
              textAlign={"center"}
            >
              Institut for X is our home and we care for it. We ask that you
              properly dispose of any trash or waste and please let a crew
              member know if you notice any damage or issues in the venue.
              Please treat the space like it’s your own.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              pl: 8,
            }}
          >
            <Typography
              letterSpacing={"4"}
              fontWeight={"400"}
              mb="4rem"
              variant="h4"
              fontSize={28}
            >
              Event Guidelines
            </Typography>
            <Typography
              sx={{
                textTransform: "uppercase",
                mb: "1rem",
                fontSize: 16,
                fontWeight: "400",
              }}
              variant="body2"
              textAlign={"center"}
            >
              We create the experience together 💜
            </Typography>
            <Typography
              sx={{ mb: "3rem", fontSize: 14, fontWeight: "400" }}
              variant="body2"
              textAlign={"center"}
            >
              Be mindful of the space you're taking, remember your
              responsibility to make the space safer, and care for each other.
            </Typography>
            <Typography
              sx={{
                textTransform: "uppercase",
                mb: "1rem",
                fontSize: 16,
                fontWeight: "400",
              }}
              variant="body2"
              textAlign={"center"}
            >
              We encourage to minimize the talking on the dancefloor 💗
            </Typography>
            <Typography
              sx={{ mb: "3rem", fontSize: 14, fontWeight: "400" }}
              variant="body2"
              textAlign={"center"}
            >
              There’s no need to shout and it can easily be a vibe-killer for
              those interested in listening to the music, there’re plenty of
              places in the venue to have a chat.
            </Typography>
            <Typography
              sx={{
                textTransform: "uppercase",
                mb: "1rem",
                fontSize: 16,
                fontWeight: "400",
              }}
              variant="body2"
              textAlign={"center"}
            >
              TAKE CARE OF YOURSELF ♥️
            </Typography>
            <Typography
              sx={{ mb: "3rem", fontSize: 14, fontWeight: "400" }}
              variant="body2"
              textAlign={"center"}
            >
              Sometimes it’s easy to get carried away at a party. Know your
              boundaries, take care of yourself and consume responsibly.
            </Typography>
            <Typography
              sx={{
                textTransform: "uppercase",
                mb: "1rem",
                fontSize: 16,
                fontWeight: "400",
              }}
              variant="body2"
              textAlign={"center"}
            >
              STAY HYDRATED 💙
            </Typography>
            <Typography
              sx={{ mb: "3rem", fontSize: 14, fontWeight: "400" }}
              variant="body2"
              textAlign={"center"}
            >
              Our home venue has a sink in the kitchen available for everyone,
              with cups and glasses above the sink. Please remember to wash up
              after using.
            </Typography>
            <Typography
              sx={{ mt: "3rem", mx: "10rem", fontSize: 14, fontWeight: "400" }}
              variant="body2"
              textAlign={"center"}
            >
              In essence, <br />
              <br /> Be kind and look out for each other. Have fun but safe.
            </Typography>
          </Box>
        </Box>
        <Typography
          letterSpacing={"4"}
          fontWeight={"400"}
          mt="12rem"
          mb="1rem"
          variant="h4"
          fontSize={28}
        >
          FEEDBACK
        </Typography>
        <Typography
          sx={{ mx: "13rem", mb: "1rem", fontSize: 14, fontWeight: "400" }}
          variant="body2"
          textAlign={"center"}
        >
          We are always looking into ways of making our events safer, more
          welcoming to the freedom of self-expression, and more comfortable for
          every guest. We’d like to hear your thoughts, experiences, and
          feedback - whether it's a situation that made you feel unsafe or
          uncomfortable, a dangerous situation you witnessed but didn't know how
          to handle, or even ideas for improvements or things to address.
        </Typography>
        <TextField
          multiline
          minRows={5}
          maxRows={8}
          placeholder="Feedback..."
          slotProps={{
            input: { sx: { backgroundColor: "transparent", width: "50rem" } },
            maxLength: 200
          }}
        />
        <Button sx={{bgcolor: "transparent"}}>Submit</Button>
      </Box>
    </Box>
  );
};

export default AboutPage;
