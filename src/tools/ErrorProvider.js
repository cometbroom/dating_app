import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";

export default function ErrorProvider(props) {
  const router = useRouter();

  const navigate = (path) => {
    router.push(path);
  };

  return (
    <>
      {props.error && navigate(`/error/${props.error}`)}
      {props.loading ? <CircularProgress /> : props.children}
    </>
  );
}
