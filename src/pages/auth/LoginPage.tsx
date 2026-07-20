import SignInForm from "@/components/Auth/Login/Login";

function LoginPage() {
  return (
    <>
      <SignInForm />
      <p className="flex gap-1 justify-center items-center pt-5 ">
        &copy; {new Date().getFullYear()}{" "}
        <a href="mailto:miracleama17@gmail.com">Amadi Miracle .</a>
        All rights reserved.
      </p>
      <p className="flex gap-1 justify-center items-center mb-5">
        Have a project in mind?{" "}
        <a
          href="mailto:miracleama17@gmail.com"
          className="font-medium text-accent hover:underline"
        >
          Click here to get in touch.
        </a>
      </p>
    </>
  );
}

export default LoginPage;
