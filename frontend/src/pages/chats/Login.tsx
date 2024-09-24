import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "asdasdasd@nova.com",
      password: "sashamiro",
    },
  });

  const { login,auth } = useContext(AuthContext);

  const [isLogginError, setIsLogginError] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    // Aquí puedes llamar a tu API de autenticación
    const ok = await login(data.password, data.email);
    console.log("Authenticated ! ", ok);
    // @ts-ignore
    if (!ok) {
      setIsLogginError(true);
    }
  };

  return (
    <form
      className="container col-5 my-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h1>Login</h1>

      { !auth.checking && isLogginError && (
        <div className="alert alert-danger" role="alert">
          Usuario o contraseña incorrectos
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
          aria-describedby="emailHelp"
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      <div className="mb-3">
        Crear una cuenta <Link to="/chat/register">aquí</Link>
      </div>
      {/* <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label">Check me out</label>
      </div> */}

      <button type="submit" className="btn btn-primary">
        Entrar
      </button>
    </form>
  );
};
