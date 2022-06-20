import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { GET_ERROR_PATH } from "./constants";

export default function ErrorProvider(props) {
  const router = useRouter();

  const navigate = (path) => {
    router.push(path);
  };

  return (
    <>
      {props.error && navigate(GET_ERROR_PATH(props.error))}
      {props.loading ? (
        <CircularProgress
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      ) : (
        props.children
      )}
    </>
  );
}
