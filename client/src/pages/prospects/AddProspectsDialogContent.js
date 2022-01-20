import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Grid, CircularProgress } from "@material-ui/core";


const AddPropsectsDialogContent = ({
    isDataLoading,
    campaigns,
    handleCampaignChange,
    selectedCampaign,
    handleSubmit
}) => {

  return (
    <DialogContent>
        {isDataLoading ? (
            <Grid container justifyContent="center">
                <CircularProgress />
            </Grid>
        ) : (
            <FormControl>
                <InputLabel>Select a Campaign</InputLabel>
                <Select
                    label="campaign"
                    value={selectedCampaign}
                    onChange={handleCampaignChange}  
                    variant="outlined"
                    color="primary"  
                >
                    {campaigns.map(campaign => (
                        <MenuItem value={campaign.id} key={campaign.id}>{campaign.name}</MenuItem>
                    ))}
                </Select>
                <Button variant="outlined" color="primary" onClick={handleSubmit}>Confirm</Button>
            </FormControl>
        )}
    </DialogContent>
    );
};

export default AddPropsectsDialogContent;
