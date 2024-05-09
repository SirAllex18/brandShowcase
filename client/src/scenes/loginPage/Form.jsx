// import { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   useMediaQuery,
// } from "@mui/material";

// import { Formik } from "formik";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setLogin } from "state";


// const registerSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   password: yup.string().required("required"),
// });

// const loginSchema = yup.object().shape({
//   password: yup.string().required("required"),
// });


// const initialValuesRegister = {
//   firstName: "",
//   lastName: "",
//   password: "",
// };

// const initialValuesLogin = {
//   password: "",
// };

// const Form = () => {
//   const [pageType, setPageType] = useState("initial");
//   const [emailUser, setEmailUser] = useState()
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const isLogin = pageType === "login";
//   const isRegister = pageType === "register";
//   const isInitial = pageType === "initial";

//   const register = async (values, onSubmitProps) => {
//     // this allows us to send form info with image
//     const formData = new FormData();
//     for (let value in values) {
//       formData.append(value, values[value]);
//     }

//     const savedUserResponse = await fetch(
//       "http://localhost:3001/auth/register",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );
//     const savedUser = await savedUserResponse.json();
//     onSubmitProps.resetForm();

//     if (savedUser) {
//       setPageType("login");
//     }
//   };

//   const login = async (values, onSubmitProps) => {
//     try {
//       const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });
//       const loggedIn = await loggedInResponse.json();
//       onSubmitProps.resetForm();
//       if (loggedIn) {
//         dispatch(
//           setLogin({
//             user: loggedIn.user,
//             token: loggedIn.token,
//           })
//         );
//         navigate("/");
//       }

//     } catch(err){
//       return (err.message)
//     }
//   };

//   const handleFormSubmit = async (values, onSubmitProps) => {
//     setEmailUser(values.email)
//     if (isInitial) {
//       const result = await login(values, onSubmitProps)
//       if(result.res.status === 200) {
//         setPageType('login')
//       } else setPageType('register')
//     }
//     if (isLogin) await login(values, onSubmitProps);
//     if (isRegister) await register(values, onSubmitProps);
//   };

//   return (
//     <Formik
//       onSubmit={handleFormSubmit}
//       initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
//       validationSchema={isLogin ? loginSchema : registerSchema}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleBlur,
//         handleChange,
//         handleSubmit,
//         resetForm,
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <Box
//             display="grid"
//             gap="30px"
//             gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//             sx={{
//               "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//             }}
//           >
//             {isRegister && (
//               <>
//                 <TextField
//                   label="First Name"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.firstName}
//                   name="firstName"
//                   error={
//                     Boolean(touched.firstName) && Boolean(errors.firstName)
//                   }
//                   helperText={touched.firstName && errors.firstName}
//                   sx={{ gridColumn: "span 2" }}
//                 />
//                 <TextField
//                   label="Last Name"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.lastName}
//                   name="lastName"
//                   error={Boolean(touched.lastName) && Boolean(errors.lastName)}
//                   helperText={touched.lastName && errors.lastName}
//                   sx={{ gridColumn: "span 2" }}
//                 />
//                 <TextField
//                   label="Birthday"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.lastName}
//                   name="birthday"
//                   error={Boolean(touched.lastName) && Boolean(errors.lastName)}
//                   helperText={touched.lastName && errors.lastName}
//                   sx={{ gridColumn: "span 2" }}
//                 />
//               </>
//             )}
//             {isLogin && (
//               <>
//                 <TextField
//                   label="Password"
//                   type="password"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.password}
//                   name="password"
//                   error={Boolean(touched.password) && Boolean(errors.password)}
//                   helperText={touched.password && errors.password}
//                   sx={{ gridColumn: "span 4" }}
//                 />
//               </>
//             )}
//             <TextField
//               label="Email"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               value={values.email}
//               name="email"
//               error={Boolean(touched.email) && Boolean(errors.email)}
//               helperText={touched.email && errors.email}
//               sx={{ gridColumn: "span 4" }}
//             />
//           </Box>

//           {/* BUTTONS */}
//           <Box>
//             <Button
//               fullWidth
//               type="submit"
//               sx={{
//                 m: "2rem 0",
//                 p: "1rem",
//               }}
//             >
//               {isInitial ? "Continue" : "Register now. Become a blue"} 
//             </Button>
//             {/* <Typography
//               onClick={() => {
//                 setPageType(isLogin ? "register" : "login");
//                 resetForm();
//               }}
//               sx={{
//                 textDecoration: "underline",
//                 "&:hover": {
//                   cursor: "pointer",
//                 },
//               }}
//             >
//               {isLogin
//                 ? "Don't have an account? Sign Up here."
//                 : "Already have an account? Login here."}
//             </Typography> */}
//           </Box>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default Form;


import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

// Validation schemas
const emailSchema = yup.object({
  email: yup.string().email("Invalid email").required("Required"),
});

const loginSchema = yup.object({
  password: yup.string().required("Required"),
});

const registerSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

// Initial values
const initialEmailValues = {
  email: "",
};

const initialLoginValues = {
  password: "",
};

const initialRegisterValues = {
  firstName: "",
  lastName: "",
  password: "",
};

const Form = () => {
  const [formStage, setFormStage] = useState("email"); // 'email', 'login', 'register'
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailSubmit = async (values, { setSubmitting }) => {
    // Check if email exists in the database
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email }),
    });
  
    if (response.ok) {
      // User exists, prompt for password
      setUserEmail(values.email);
      setFormStage("login");
    } else {
      // No user found, switch to register form
      setUserEmail(values.email);
      setFormStage("register");
    }

    setSubmitting(false);
  };

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    // Attempt to log in
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        password: values.password,
      }),
    });
    const data = await response.json();

    if (response.ok && data.token) {
      // Login successful
      dispatch(setLogin({ user: data.user, token: data.token }));
      navigate("/");
    } else {
      // Handle login failure
      console.error("Login failed");
    }

    setSubmitting(false);
  };

  const handleRegisterSubmit = async (values, { setSubmitting }) => {
    // Attempt to register
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        email: userEmail,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      // Registration successful, proceed to login
      setFormStage("login");
    } else {
      // Handle registration failure
      console.error("Registration failed");
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={
        formStage === "email"
          ? initialEmailValues
          : formStage === "login"
          ? initialLoginValues
          : initialRegisterValues
      }
      validationSchema={
        formStage === "email"
          ? emailSchema
          : formStage === "login"
          ? loginSchema
          : registerSchema
      }
      onSubmit={
        formStage === "email"
          ? handleEmailSubmit
          : formStage === "login"
          ? handleLoginSubmit
          : handleRegisterSubmit
      }
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="20px">
            {formStage === "email" && (
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            )}
            {formStage === "login" && (
              <TextField
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            )}
            {formStage === "register" && (
              <>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {formStage === "email" ? "Continue" : formStage === "login" ? "Login" : "Register"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
