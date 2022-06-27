import useSession from "../hooks/useSession";
import CommView from "../views/CommView";

export default function CommController() {
  const [session, loadSession, errSession] = useSession();

  console.log(session);

  return <>{session && <CommView contacts={session.chats} />}</>;
}
