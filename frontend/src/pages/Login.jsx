// frontend/src/pages/Login.jsx
import './Login.css';

const Login = () => {
  return (
    <section className="login-page">
      <div className="login-card">
        <h2>Member Access</h2>
        <p>Login and registration coming soon. Stay tuned!</p>
        <form>
          <input type="text" placeholder="Email" disabled />
          <input type="password" placeholder="Password" disabled />
          <button disabled>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;