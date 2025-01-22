export interface CampaignCategory {
    id: string;
    campaign_category_name: string;
    description: string;
    amount: number;
    date_created: string;
    last_updated: string | null;
    main_campaign_id: string;
  }
  
  export interface Campaign {
    id: string;
    campaign_title: string;
    about_campaign_cause: string;
    campaign_goal: number;
    campaign_start_date: string;
    campaign_end_date: string;
    campaign_status: string;
    created_by: string;
    user_id: string;
    withdraw_contact: string;
    total_contributions: number;
    total_pledged: number;
    categories: CampaignCategory[];
    date_created: string;
    last_updated: string | null;
    link: string;
    image: string | null;
  }
  