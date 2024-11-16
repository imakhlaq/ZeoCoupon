import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocalLogin = () => {
  return (
    <div className="flex gap-5 justify-center">
      <form
        action={async function () {
          "use server";
          await signIn("github");
        }}
      >
        <Button className="">
          <FaGithub className="" />
          <p>Github</p>
        </Button>
      </form>
      <form
        action={async function () {
          "use server";
          await signIn("google");
        }}
      >
        <Button>
          <FaGoogle />
          <p>Google</p>
        </Button>
      </form>
    </div>
  );
};

export default SocalLogin;
