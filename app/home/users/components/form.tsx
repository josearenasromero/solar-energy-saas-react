"use client";
import { Grid, InputLabel, MenuItem, Select, TextField } from "@lib/mui";
import { User } from "@models/User";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface UserFormProps {
  user?: User;
  onFormSubmit: (data: User) => void;
}

const Form: React.FC<UserFormProps> = (props) => {
  const user = props.user;
  const {
    reset,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      id: user ? user.id : "",
      name: user ? user.name : "",
      email: user ? user.email : "",
      password: "",
      confirmPassword: "",
      role: user ? user.role : "",
    });
  }, [reset, user]);

  const onSubmit = (data: any) => props.onFormSubmit(data);

  return (
    <form id="userForm" onSubmit={handleSubmit(onSubmit)}>
      <Grid alignItems={"center"} container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Controller
            defaultValue={""}
            control={control}
            name="id"
            render={({ field }) => (
              <div><input {...field} type="hidden" /></div>
            )}
          />

          <Controller
            defaultValue={""}
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <div>
                <InputLabel htmlFor="name">Name:</InputLabel>
                <TextField
                  {...field}
                  fullWidth
                  id="name"
                  error={!!errors.name}
                  helperText={errors?.name?.message?.toString()}
                />
              </div>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Controller
            defaultValue={""}
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <div>
                <InputLabel htmlFor="email">Email:</InputLabel>
                <TextField
                  fullWidth
                  id="email"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.email}
                  helperText={errors?.email?.message?.toString()}
                />
              </div>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Controller
            defaultValue={""}
            control={control}
            name="password"
            rules={{
              ...(!user && {
                required: "Password is required",
              }),
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <div>
                <InputLabel htmlFor="password">Password:</InputLabel>
                <TextField
                  fullWidth
                  type="password"
                  id="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message?.toString()}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </div>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Controller
            defaultValue={""}
            control={control}
            name="confirmPassword"
            rules={{
              ...(!user && {
                required: "Confirm Password is required",
              }),
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <div>
                <InputLabel htmlFor="confirmPassword">
                  Confirm Password:
                </InputLabel>
                <TextField
                  fullWidth
                  type="password"
                  id="confirmPassword"
                  error={!!errors.confirmPassword}
                  helperText={errors?.confirmPassword?.message?.toString()}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </div>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Controller
            defaultValue={""}
            control={control}
            name="role"
            rules={{ required: "Role is required" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <div>
                <InputLabel htmlFor="role">Role:</InputLabel>
                <Select
                  id="role"
                  error={!!errors.role}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                >
                  <MenuItem value={"user"}>User</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </div>
            )}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
