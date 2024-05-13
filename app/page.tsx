"use client";
import { Box, Button, Card, Grid, TextField } from "@/lib/mui";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

export default function LoginPage() {
  const callbackUrl = "/home";
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });

      setLoading(false);
      if (response?.error) {
        setError("Invalid credentials.");
        return;
      }

      router.push(callbackUrl);
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"100vh"}
      >
        <Grid container justifyContent={"space-around"}>
          <Grid item xs={10} md={5} lg={5}>
            <Card variant="outlined">
              <Box padding={2}>
                <form onSubmit={onSubmit}>
                  <Grid container>
                    <Grid item xs={12} lg={12}>
                      <h2>Solar ROI - Log In</h2>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <TextField
                        required
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        fullWidth
                        label="Email"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={12} marginTop={2}>
                      <TextField
                        required
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        fullWidth
                        label="Password"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid
                      marginTop={1}
                      item
                      xs={12}
                      lg={12}
                      textAlign={"right"}
                      style={{ color: "red" }}
                    >
                      {error}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    marginTop={2}
                    justifyContent={"space-between"}
                  >
                    <Grid item xs={12} lg={3}></Grid>
                    <Grid item xs={12} lg={3} textAlign={"right"}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
