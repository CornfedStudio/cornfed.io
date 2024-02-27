'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])?$/
)

const FormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  phone: z
    .string()
    .regex(phoneRegex, {
      message: 'Please enter a valid phone number.'
    })
    .optional(),
  description: z.string().min(1, {
    message: 'Please enter a description.'
  }),
  scopeNeeds: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'Please select at least one.'
  }),
  pricingOptions: z
    .array(z.string())
    .refine(value => value.some(item => item), {
      message: 'Please select at least one.'
    }),
  additionalNotes: z.string().optional()
})

const pricingOptions = [
  {
    id: 'hourly',
    label: 'Hourly'
  },
  {
    id: 'project-based',
    label: 'Project-Based'
  },
  {
    id: 'value-based',
    label: 'Value-Based'
  },
  {
    id: 'retainer',
    label: 'Retainer'
  },
  {
    id: 'N/A',
    label: "I don't know / Not sure"
  }
] as const

const scopeNeeds = [
  {
    id: 'strategy',
    label: 'Strategy'
  },
  {
    id: 'creative',
    label: 'Creative'
  },
  {
    id: 'development',
    label: 'Development'
  },
  {
    id: 'web3',
    label: 'Web3'
  },
  {
    id: 'N/A',
    label: "I don't know / Not sure"
  }
] as const

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      phone: '',
      description: '',
      scopeNeeds: [],
      pricingOptions: [],
      additionalNotes: ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    const webhookData = {
      embeds: [
        {
          title: 'New Lead',
          fields: Object.entries(data).map(([key, value]) => ({
            name: key,
            value: value.toString()
          }))
        }
      ]
    }

    try {
      await fetch(process.env.NEXT_PUBLIC_DISCORD_LEADS_WEBHOOK as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookData)
      })

      toast.success('Form submitted. Thank you.')
      form.reset()
    } catch (error) {
      console.error(error)
      toast('Failed to submit form. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='my-12 w-full'>
      <div className='mb-12 space-y-4'>
        <div className='text-2xl md:text-4xl'>Thanks for your interest.</div>
        <div>
          <div className='text-lg md:text-2xl'>Fill out the form below.</div>
          <div className='text-lg md:text-2xl'>
            We&apos;ll reach out soon after.
          </div>
        </div>
      </div>
      <Card className='rounded-3xl p-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-1 gap-8 sm:grid-cols-2'
          >
            <div className='col-span-2 sm:col-span-1'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email Address <sup>*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    {/* <FormDescription>
                                 This is your public display name.
                              </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 sm:col-span-1'>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number <sup>(optional)</sup>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='' type='tel' {...field} />
                    </FormControl>
                    {/* <FormDescription>
                                 This is your public display name.
                              </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2'>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Project Info <sup>*</sup>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Type your message here.'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A description of your project and what you&apos;re looking
                      for.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 sm:col-span-1'>
              <FormField
                control={form.control}
                name='scopeNeeds'
                render={() => (
                  <FormItem>
                    <div className='mb-4'>
                      <FormLabel className=''>
                        Scope of Work <sup>*</sup>
                      </FormLabel>
                      <FormDescription>
                        What areas do you need help with?
                      </FormDescription>
                    </div>
                    <div className='space-y-5'>
                      {scopeNeeds.map(item => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name='scopeNeeds'
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className='flex flex-row items-start space-x-3 space-y-0'
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={checked => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              value => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 sm:col-span-1'>
              <FormField
                control={form.control}
                name='pricingOptions'
                render={() => (
                  <FormItem>
                    <div className='mb-4'>
                      <FormLabel className=''>
                        Pricing Preference <sup>*</sup>
                      </FormLabel>
                      <FormDescription>
                        How would you like to pay?
                      </FormDescription>
                    </div>
                    <div className='space-y-5'>
                      {pricingOptions.map(item => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name='pricingOptions'
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className='flex flex-row items-start space-x-3 space-y-0'
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={checked => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              value => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2'>
              <FormField
                control={form.control}
                name='additionalNotes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      AdditionalNotes <sup>(optional)</sup>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Type your message here.'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Anything else you&apos;d like us to know.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 flex justify-end border-t pt-6'>
              {!isLoading ? (
                <Button type='submit'>Submit</Button>
              ) : (
                <Button disabled>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}
