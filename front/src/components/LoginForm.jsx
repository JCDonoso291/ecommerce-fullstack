import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const LoginForm = () => {
  const { loginClient, isLoading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    loginClient(email, password)
      .catch(() => {
        setError("Email o contraseña incorrectos");
      });
  };

  return (
    <div>
      <h2>Ingreso de Cliente</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

