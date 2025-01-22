import api from "./index";


interface CampaignPayload {
  campaign_title: string;
  about_campaign_cause: string;
  campaign_goal: number;
  withdraw_contact: string;
  campaign_start_date: string;
  campaign_end_date: string;
}

export const createCampaign = async (payload: CampaignPayload) => {
  const response = await api.post("/jebafundme", payload);

  return response.data;
};

export const getCampaigns = async () => {
  const response = await api.get("/jebafundme");

  return response.data;
};

export const getSingleCampaign = async (id: string) => {
 
  const response = await api.get(`/jebafundme/${id}`);
  
  return response.data;
};

export const deleteCampaign = async (id: string) => {
 
  const response = await api.delete(`/jebafundme/${id}`);
  
  return response.data;
};

export const updateCampaign = async (id: string, payload: CampaignPayload) => {
 
  const response = await api.patch(`/jebafundme/${id}`, payload);
  
  return response.data;
};

