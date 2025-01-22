"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getSingleCampaign, deleteCampaign } from "@/api/campaign"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Share2, Calendar, Edit, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { UpdateCampaignModal } from "@/components/UpdateCampaign"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Campaign } from "@/types/campaign"


export function CampaignDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchCampaign = async () => {
      try {
        const data = await getSingleCampaign(id as string)
        setCampaign(data.fundme_campaign)
      } catch (error) {
        console.error("Error fetching campaign:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [id])

  const handleUpdate = (updatedCampaign: Campaign) => {
    setCampaign(updatedCampaign)
  }

  const handleDelete = async () => {
    if (!campaign) return

    try {
      await deleteCampaign(campaign.id)
      router.push("/campaigns")
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  }

  if (loading) return <p>Loading...</p>
  if (!campaign) return <p>Campaign not found.</p>

  const progress = (campaign.total_pledged / campaign.campaign_goal) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden">
          {campaign.image && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={campaign.image || "/placeholder.svg"}
                alt={campaign.campaign_title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{campaign.campaign_title}</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => setIsUpdateModalOpen(true)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit campaign</span>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete campaign</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your campaign and remove your data
                          from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share campaign</span>
                  </Button>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Created by {campaign.created_by}</p>
            </div>

            <div className="mb-8">
              <Progress value={progress} className="h-2" />
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold">${campaign.total_pledged}</p>
                  <p className="text-sm text-muted-foreground">raised of ${campaign.campaign_goal} goal</p>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    {campaign.campaign_status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">About this campaign</h2>
              <p className="whitespace-pre-wrap text-muted-foreground">{campaign.about_campaign_cause}</p>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Campaign Categories</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {campaign.categories?.length > 0 ? (
                  campaign.categories.map((category) => (
                    <Card key={category.id} className="p-4">
                      <h3 className="font-semibold">{category.campaign_category_name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                      <p className="mt-2 font-medium">Goal: ${category.amount}</p>
                    </Card>
                  ))
                ) : (
                  <p>No categories available.</p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Campaign Timeline</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">{formatDate(campaign.campaign_start_date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground">{formatDate(campaign.campaign_end_date)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="flex-1" size="lg">
                Donate now
              </Button>
              <Button variant="outline" className="flex-1" size="lg">
                Share campaign
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {campaign && (
        <UpdateCampaignModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          campaign={campaign}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default CampaignDetail;