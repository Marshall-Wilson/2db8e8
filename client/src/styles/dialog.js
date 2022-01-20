import { makeStyles } from "@material-ui/core";

export const useDialogStyles = makeStyles((theme) => ({
    DialogContentRoot: {
        margin: "0 10%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    DialogContentSubmit: {
        margin: "30px auto"
    }
}));