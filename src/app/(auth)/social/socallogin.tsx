import { handleGithubSignIn, handleGoogleSignIn } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";

/*
This is a server componet. But you can also call server actions inside a client componets
eg:

"use clinet"

---------------------------------------| calling server action inside a client component
<Button className="" onClick={handleGithubSignIn}>
          <FaGithub className="" />
          <p>Github</p>
</Button>

*/

const SocalLogin = () => {
  return (
    <div className="flex gap-5 justify-center">
      <form action={handleGithubSignIn} className="">
        <Button className="">
          <FaGithub className="" />
          <p>Github</p>
        </Button>
      </form>
      <form action={handleGoogleSignIn} className="">
        <Button>
          <FaGoogle />
          <p>Google</p>
        </Button>
      </form>
    </div>
  );
};

export default SocalLogin;
