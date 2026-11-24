import RegisterForm from '@/features/auth/components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-2 bg-primary">
      <h1 className="text-center text-5xl text-white font-bold p-10">
        TaskMeUp
      </h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
