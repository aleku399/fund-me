"use client"

import { useEffect, useState } from "react"
import { getCampaigns } from "@/api/campaign"
import type { Campaign } from "@/types/campaign"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getCampaigns()
        if (response.success) {
          setCampaigns(response.fundme_campaigns)
          setFilteredCampaigns(response.fundme_campaigns)
        } else {
          setError("Verification failed. Please try again.")
        }
      } catch (error) {
        console.error(error)
        setError("An error occurred. Please check the code and try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  useEffect(() => {
    const filtered = campaigns.filter(
      (campaign) =>
        campaign.campaign_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.about_campaign_cause.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredCampaigns(filtered)
  }, [searchQuery, campaigns])

  const calculateProgress = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
  }
  console.log("error", error);
  console.log("isLoading", isLoading);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Your Fundraising Campaigns</h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search campaigns..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredCampaigns.length === 0 ? (
        <p className="text-muted-foreground">
          {searchQuery ? "No campaigns match your search." : "You haven't started any campaigns yet."}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign: Campaign, index: number) => (
            <Card key={campaign.id} className={`overflow-hidden ${index === 0 ? "md:col-span-2 lg:col-span-3" : ""}`}>
              <Link href={`campaigns/${campaign.id}`} className="group block">
                <div className="relative bg-gradient-to-br from-green-50 to-green-100 p-6">
                  <h2 className="text-2xl font-bold leading-tight text-green-800">{campaign.campaign_title}</h2>
                </div>
                <div className="p-6">
                  <p className="mb-4 line-clamp-2 text-muted-foreground">{campaign.about_campaign_cause}</p>
                  <Progress value={calculateProgress(campaign.total_contributions, campaign.campaign_goal)} className="mb-2 h-2 bg-gray-100" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold">${(campaign.total_contributions)}</p>
                      <p className="text-sm text-muted-foreground">
                        raised of ${campaign.campaign_goal} goal
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        {campaign.campaign_status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}

      {filteredCampaigns.length > 6 && (
        <div className="mt-8 text-center">
          <button className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium hover:bg-gray-50">
            Show more
          </button>
        </div>
      )}
    </div>
  )
}

