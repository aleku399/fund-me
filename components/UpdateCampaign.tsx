import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { updateCampaign } from "@/api/campaign"
import { Campaign } from "@/types/campaign"
import { Loader2 } from "lucide-react"

interface UpdateCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  campaign: Campaign
  onUpdate: (updatedCampaign: Campaign) => void
}

export function UpdateCampaignModal({ isOpen, onClose, campaign, onUpdate }: UpdateCampaignModalProps) {
  const [formData, setFormData] = useState({
    campaign_title: campaign.campaign_title,
    about_campaign_cause: campaign.about_campaign_cause,
    campaign_goal: campaign.campaign_goal,
    withdraw_contact: campaign.withdraw_contact,
    campaign_start_date: campaign.campaign_start_date,
    campaign_end_date: campaign.campaign_end_date,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true) // Start loading
    try {
      const updatedCampaign = await updateCampaign(campaign.id, formData)
      if (updatedCampaign.success) {
        onUpdate(updatedCampaign.fundme_campaign)
      }
      onClose()
    } catch (error) {
      console.error("Error updating campaign:", error)
    } finally {
      setIsLoading(false) // Stop loading
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Campaign</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign_title" className="text-right">
                Title
              </Label>
              <Input
                id="campaign_title"
                name="campaign_title"
                value={formData.campaign_title}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="about_campaign_cause" className="text-right">
                About
              </Label>
              <Textarea
                id="about_campaign_cause"
                name="about_campaign_cause"
                value={formData.about_campaign_cause}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign_goal" className="text-right">
                Goal
              </Label>
              <Input
                id="campaign_goal"
                name="campaign_goal"
                type="number"
                value={formData.campaign_goal}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="withdraw_contact" className="text-right">
                Contact
              </Label>
              <Input
                id="withdraw_contact"
                name="withdraw_contact"
                value={formData.withdraw_contact}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign_start_date" className="text-right">
                Start Date
              </Label>
              <Input
                id="campaign_start_date"
                name="campaign_start_date"
                type="date"
                value={formData.campaign_start_date}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign_end_date" className="text-right">
                End Date
              </Label>
              <Input
                id="campaign_end_date"
                name="campaign_end_date"
                type="date"
                value={formData.campaign_end_date}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
