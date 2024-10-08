import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

interface RegisterFormInputs {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const { register: registerUser } = useContext(AuthContext); // Usamos el método register desde el contexto
  const navigate = useNavigate(); // Para redirigir después del registro

  const onSubmit = async (data: RegisterFormInputs) => {
    // Eliminamos confirmPassword ya que no necesitamos enviarlo al backend
    // @ts-ignore
    delete data.confirmPassword;

    // Hacemos la llamada al método register del contexto de autenticación
    const success = await registerUser(
      data.name,
      data.email,
      data.surname,
      data.password
    );

    if (success) {
      // Si el registro es exitoso, redirigimos al usuario al chat o al login
      navigate("/chat/home");
    } else {
      // Manejar el error en caso de que el registro falle
      console.log("Error al registrarse");
    }
  };

  return (
    <form className="container col-5 my-5" onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Surname</label>
        <input
          type="text"
          className="form-control"
          {...register("surname", { required: "Surname is required" })}
        />
        {errors.surname && (
          <p className="text-danger">{errors.surname.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value, context) =>
              value === context.password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-danger">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="mb-3">
        Ya tienes cuenta? <Link to="/chat/login">Inicia sesión</Link>
      </div>
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
};
