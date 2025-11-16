import { LoginForm } from "../../../components/LoginForm";

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-4xl font-semibold text-center mb-6">Login</h1>
        <LoginForm />

        <div className="mt-4 text-center">
          <span>Don’t have an account? </span>
          <a href="/register" className="text-[#5046E4] font-semibold">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};
