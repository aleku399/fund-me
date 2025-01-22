"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  User,
  Heart,
  CalendarIcon,
} from "lucide-react";
import * as z from "zod";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { createCampaign } from "@/api/campaign";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";

const campaignCategories = [
  "Animals",
  "Business",
  "Community",
  "Competitions",
  "Creative",
  "Education",
  "Emergencies",
  "Environment",
  "Events",
  "Faith",
  "Family",
  "Funerals & Memorials",
  "Medical",
  "Monthly Bills",
  "Newlyweds",
  "Sports",
  "Travel",
  "Ukraine Relief",
  "Volunteer",
  "Wishes",
] as const;

const formSchema = z.object({
  step: z.number().min(1).max(5),
  category: z.enum(campaignCategories),
  beneficiaryType: z.enum(["self", "other", "charity"]),
  country: z.string().min(1),
  phoneNumber: z.string().min(5),
  campaignTitle: z.string().min(5).max(100),
  description: z.string().min(10).max(2000),
  goalAmount: z.number().min(100),
  autoAdjustGoal: z.boolean(),
  startDate: z.string(),
  endDate: z.string(),
  beneficiaryEmail: z.string().email().optional(),
  charityName: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateCampaign() {
  const [step, setStep] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      step: 1,
      autoAdjustGoal: true,
      category: "Education",
      beneficiaryType: "self",
      country: "Uganda",
      phoneNumber: "0755574905",
      campaignTitle: "Fundraising for war heroes",
      description: "Help us reach our goal",
      goalAmount: 200,
      startDate: "2024-12-01",
      endDate: "2025-10-01",
      beneficiaryEmail: "abc@gmail.com",
      charityName: "Test",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (step < 5) {
      setStep(step + 1);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const payload = {
        campaign_title: data.campaignTitle,
        about_campaign_cause: data.beneficiaryType,
        campaign_goal: data.goalAmount,
        withdraw_contact: data.phoneNumber,
        campaign_start_date: data.startDate,
        campaign_end_date: data.endDate,
      };
      const response = await createCampaign(payload);

      if (response.success) {
        router.push("/campaigns");
      } else {
        setError("Failed to create campaign. Please try again.");
        throw new Error("Failed to create campaign");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("Error:", error);
  return (
    <div className="container max-w-2xl mx-auto py-10">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">Step {step} of 5</p>
            <h1 className="text-3xl font-bold tracking-tight">
              {step === 1 && "What best describes why you're fundraising?"}
              {step === 2 && "Who are you fundraising for?"}
              {step === 3 && "Tell us how much you'd like to raise"}
              {step === 4 && "Where will the funds go?"}
              {step === 5 && "Tell us about your campaign"}
            </h1>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                console.log("Submitting the form");
                onSubmit(data);
              })}
              className="space-y-6"
            >
              {step === 1 && (
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          {campaignCategories.map((category) => (
                            <FormItem key={category}>
                              <FormControl>
                                <RadioGroupItem
                                  value={category}
                                  className="peer sr-only"
                                />
                              </FormControl>
                              <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                {category}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {step === 2 && (
                <FormField
                  control={form.control}
                  name="beneficiaryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid gap-4"
                        >
                          <FormItem>
                            <FormControl>
                              <RadioGroupItem
                                value="self"
                                className="peer sr-only"
                              />
                            </FormControl>
                            <FormLabel className="flex items-center gap-4 rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                              <User className="h-5 w-5" />
                              <div>
                                <p className="font-medium">Yourself</p>
                                <p className="text-sm text-muted-foreground">
                                  Funds are delivered to your bank account
                                </p>
                              </div>
                            </FormLabel>
                          </FormItem>
                          <FormItem>
                            <FormControl>
                              <RadioGroupItem
                                value="other"
                                className="peer sr-only"
                              />
                            </FormControl>
                            <FormLabel className="flex items-center gap-4 rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                              <Users className="h-5 w-5" />
                              <div>
                                <p className="font-medium">Someone else</p>
                                <p className="text-sm text-muted-foreground">
                                  You&apos;ll invite a beneficiary to receive
                                  funds
                                </p>
                              </div>
                            </FormLabel>
                          </FormItem>
                          <FormItem>
                            <FormControl>
                              <RadioGroupItem
                                value="charity"
                                className="peer sr-only"
                              />
                            </FormControl>
                            <FormLabel className="flex items-center gap-4 rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                              <Heart className="h-5 w-5" />
                              <div>
                                <p className="font-medium">Charity</p>
                                <p className="text-sm text-muted-foreground">
                                  Funds are delivered to your chosen charity
                                </p>
                              </div>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {step === 3 && (
                <>
                  <FormField
                    control={form.control}
                    name="goalAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Goal Amount</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm">
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder="3000"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Fundraisers like yours typically aim to raise $4,500
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="autoAdjustGoal"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Automated goal setting
                          </FormLabel>
                          <FormDescription>
                            Gradually adjust your goal as donations come in
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  field.onChange(date?.toISOString())
                                }
                                disabled={(date) =>
                                  date < new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  field.onChange(date?.toISOString())
                                }
                                disabled={(date) =>
                                  date < new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="UG">Uganda</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="GB">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {step === 5 && (
                <>
                  <FormField
                    control={form.control}
                    name="campaignTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tell your story</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[200px]"
                            placeholder="Explain what you're raising funds for..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Campaign...
                    </>
                  ) : step === 5 ? (
                    "Create Campaign"
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
