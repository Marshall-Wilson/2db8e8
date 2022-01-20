import React, { useEffect, useState} from 'react';
import axios from "axios";
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
import AddProspectsDialogContent from './AddProspectsDialogContent.js'


const AddProspectsDialog = ({
    onClose,
    open,
    selected
}) => {
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [isDataLoading, setIsDataLoading] = useState(true);

    const selectedProspects = Object.keys(selected)
                                .map(key => selected[key] ? key : null)
                                .filter(key => key !== null)

    const handleCampaignChange = (e) => {
        setSelectedCampaign(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            const resp = await axios.post(
                `/api/campaigns/${selectedCampaign}/prospects`, 
                { prospect_ids: selectedProspects }
            );
            if (resp.data.error) throw new Error(resp.data.error);
            console.log(resp.data);
        } catch (error) {
            console.error(error);
        } finally {
            onClose();
        }
    }


    useEffect(() => {
        if (open) {
            const fetchCampaigns = async () => {
                setIsDataLoading(true);
                try {
                    const resp = await axios.get(
                    `/api/campaigns?page=0&page_size=100`,
                    );
                    if (resp.data.error) throw new Error(resp.data.error);
                    setCampaigns(resp.data.campaigns);
                    if (resp.data.campaigns.length > 0){
                        setSelectedCampaign(resp.data.campaigns[0].id)
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsDataLoading(false);
                }
            };
            fetchCampaigns();
        }
      }, [open]);
  
    return (
    <Dialog 
        open={open}
        onClose={onClose}
    >
        <DialogTitle>Select a Campaign to Add {selectedProspects.length} Prospects</DialogTitle>
        <AddProspectsDialogContent 
            isDataLoading={isDataLoading}
            campaigns={campaigns}
            handleCampaignChange={handleCampaignChange}
            selectedCampaign={selectedCampaign}
            handleSubmit={handleSubmit}
        />
    </Dialog>
  );
};

export default AddProspectsDialog;
