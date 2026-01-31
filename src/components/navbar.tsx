import { userService } from "./service/user.service";
import ClientNavbar from "./ui/ClientNav";

export default async function Navbar() {
  const userResponse = await userService.getSession();
  const user = userResponse?.data?.data ?? null;

  return <ClientNavbar user={user} />;
}
