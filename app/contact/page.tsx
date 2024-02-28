'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
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
  message: z.string().min(1, {
    message: 'Please enter a message.'
  }),
})

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      phone: '',
      message: ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    const webhookData = {
      embeds: [
        {
          title: 'New Contact',
          fields: Object.entries(data).map(([key, value]) => ({
            name: key,
            value: value.toString()
          }))
        }
      ]
    }

    try {
      await fetch(process.env.NEXT_PUBLIC_DISCORD_CONTACTS_WEBHOOK as string, {
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
        <div className='text-2xl md:text-4xl'>Contact Us</div>
        <div>
          <div className='text-lg md:text-2xl'>Fill out the form below.</div>
          <div className='text-lg md:text-2xl'>
            Thanks for reaching out.
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
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Message <sup>*</sup>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Type your message here.'
                        {...field}
                      />
                    </FormControl>
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
