import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, CircularProgress } from "@material-ui/core";
import { useDialogStyles } from '../../styles/dialog.js'

const AddPropsectsDialogContent = ({
    isDataLoading,
    campaigns,
    handleCampaignChange,
    selectedCampaign,
    handleSubmit
}) => {

    const { DialogContentRoot, DialogContentSubmit } = useDialogStyles();

    return (
        <DialogContent className={DialogContentRoot}>
            {isDataLoading ? (
                <Grid container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Autocomplete
                    id="campaign-select"
                    options={campaigns}
                    value={selectedCampaign}
                    onChange={(e, newValue) => handleCampaignChange(e, newValue)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select a Campaign" variant="outlined" color="primary"/>}
                />
            )}
            <Button 
                className={DialogContentSubmit}
                variant="outlined" 
                color="primary" 
                onClick={handleSubmit}
            >
                Confirm
            </Button>
        </DialogContent>
    );
};

export default AddPropsectsDialogContent;
