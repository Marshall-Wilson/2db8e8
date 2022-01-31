import { makeStyles } from "@material-ui/core";

export const useDialogStyles = makeStyles((theme) => ({
    dialogContentRoot: {
        margin: "0 10%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    dialogContentSubmit: {
        margin: "30px auto"
    }
}));