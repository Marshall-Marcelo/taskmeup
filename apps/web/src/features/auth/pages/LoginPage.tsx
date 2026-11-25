import LoginForm from '@/features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-2 bg-primary">
      <h1 className="text-center text-5xl text-white font-bold p-10">
        TaskMeUp
      </h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
