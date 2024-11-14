import React, { useEffect } from "react";
import "./App.css";
import { useFieldArray, useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  password: string;
  mobileNumbers: number[];
  address: {
    city: string;
    pincode: number;
    area: string;
    doorNum: string;
  };
  gender: string;
  age: number;
  date: Date;
  hobbies: { hobby: string }[];
};

const Form = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobileNumbers: [undefined, 0],
      address: {
        city: "",
        pincode: undefined,
        area: "",
        doorNum: "",
      },
      gender: "male",
      age: 2,
      date: undefined,
      hobbies: [{ hobby: "" }],
    },
  });
  const { register, formState, handleSubmit, reset, control } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "hobbies",
    control: control,
  });

  const submitHandler = async (data: FormValues) => {
    await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
    console.log(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <h1 style={{ color: "green" }} className="ml">
        React Hook Form Practice
      </h1>
      <form noValidate onSubmit={handleSubmit(submitHandler)} className="ml">
        {/*              */}
        <label htmlFor="name">Name : </label>
        <input
          id="name"
          type="text"
          placeholder="full name"
          {...register("name", {
            required: {
              value: true,
              message: "name is required",
            },
            minLength: {
              value: 4,
              message: "name should be atleast 4 char",
            },
          })}
        ></input>
        <p className="error">{errors.name?.message}</p>
        {/*              */}

        <label htmlFor="email">Email : </label>
        <input
          id="email"
          type="email"
          placeholder="email"
          {...register("email", {
            pattern: {
              value: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
              message: "invalid email",
            },
            required: {
              value: true,
              message: "Email is required",
            },
          })}
        ></input>
        <p className="error">{errors.email?.message}</p>
        {/*              */}
        <label htmlFor="password">Password : </label>
        <input
          id="password"
          type="password"
          placeholder="password"
          {...register("password", {
            required: {
              value: true,
              message: "please enter password",
            },
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
              message: "password is not strong",
            },
          })}
        ></input>
        <p className="error">{errors.password?.message}</p>
        {/*              */}
        <label htmlFor="number1">Primary mobile number : </label>
        <input
          id="number1"
          type="text"
          placeholder="mobile number"
          {...register("mobileNumbers.0", {
            valueAsNumber: true,
            required: "number is required",
            validate: (value) => {
              if (String(value).length !== 10 || isNaN(value)) {
                return "Enter valid number";
              }
            },
          })}
        ></input>
        {/* <p className="error">{errors.mobileNumbers[0]?.message}</p> */}
        {/*              */}
        <label className="ml" htmlFor="number2">
          Alternate mobile number :{" "}
        </label>
        <input
          id="number2"
          type="text"
          placeholder="mobile number"
          {...register("mobileNumbers.1", {
            valueAsNumber: true,
            validate: (value) => {
              if (isNaN(value)) {
                return "enter valid number";
              }
            },
          })}
        ></input>
        {/*              */}
        <div className="mb">
          <label htmlFor="age">Age : </label>
          <input
            id="age"
            placeholder="age"
            type="number"
            {...register("age", {
              valueAsNumber: true,
              validate: (value) => {
                if (value < 18) {
                  return "should be atleast 18 years old";
                }
              },
            })}
          ></input>
          <p className="error">{errors.age?.message}</p>
        </div>
        <div>
          <label htmlFor="gender">Gender : </label>
          <select id="gender" {...register("gender")}>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
          <p className="error">{errors.password?.message}</p>
        </div>
        <div>
          <label htmlFor="dob">Date : </label>
          <input
            id="dob"
            type="date"
            {...register("date", {
              valueAsDate: true,
              required: "select a date",
            })}
          ></input>
          <p className="error">{errors.date?.message}</p>
        </div>
        {/*              */}
        <div>
          <h3>Hobbies</h3>
          <ul>
            {fields.map((hobby, index) => {
              return (
                <li key={hobby.id}>
                  <input
                    type="text"
                    placeholder="hobby"
                    {...register(`hobbies.${index}.hobby`)}
                  ></input>

                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <button
            className="ml"
            type="button"
            onClick={() => append({ hobby: "" })}
          >
            Add new hobby
          </button>
        </div>
        <div>
          <h3>Address</h3>
          <label>City/Town : </label>
          <input
            type="text"
            placeholder="city/town"
            {...register("address.city")}
          ></input>
          <label className="ml">Area : </label>
          <input
            type="text"
            placeholder="area, street, village"
            {...register("address.area")}
          ></input>
          <label className="ml">House no. : </label>
          <input
            type="text"
            placeholder="Flat, House no."
            {...register("address.doorNum")}
          ></input>
          <label className="ml">Pincode : </label>
          <input
            type="text"
            placeholder="pincode"
            {...register("address.pincode", {
              required: "enter a pincode",
              valueAsNumber: true,
              validate: (value) => {
                if (String(value).length !== 6 || isNaN(value)) {
                  return "Enter valid pincode";
                }
              },
            })}
          ></input>
          {/* <p className="error">{errors.address?.pincode.message}</p> */}
        </div>

        <div className="center">
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
          <button className="ml" onClick={() => reset()} type="button">
            Reset
          </button>
          {/* <button
            className="ml"
            onClick={() => console.log(errors)}
            type="button"
          >
            error
          </button> */}
        </div>
      </form>
      <h2 style={{ color: "blue" }} className="ml">
        Open console to check the submitted data
      </h2>
    </div>
  );
};

export default Form;
