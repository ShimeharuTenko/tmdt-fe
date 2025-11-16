import { Button } from "antd";
import { RegisterForm } from "../../../components/RegisterForm";

export const Register: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 py-10 bg-white">
      <div className="relative w-full max-w-3xl mx-auto">

        <div className="relative z-10 bg-white/80 rounded-2xl">
          <div className="flex flex-col items-center mb-8">
            <h1 className="font-medium text-3xl sm:text-4xl mb-1 text-center">
              Register
            </h1>
            <h3 className="mb-2 text-gray-600 text-center">
              Please register to login
            </h3>
            <p className="text-sm text-gray-400 text-center">
              Create your account to continue with Lunia Jewelry.
            </p>
          </div>

          <div className="mt-4">
            <RegisterForm />
          </div>

          <div className="mx-auto w-fit text-base mt-2 mb-2">
            <span className="mr-1 text-gray-600">Already have an account?</span>
            <Button
              size="large"
              type="link"
              href="/login"
              style={{
                color: "#5046E4",
                fontWeight: 600,
                fontSize: "0.875rem",
                lineHeight: "0.875rem",
                padding: 0,
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
