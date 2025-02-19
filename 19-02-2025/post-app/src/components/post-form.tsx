import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Post } from '@/lib/types'
import { createPost } from '@/lib/post-api'
import { toast } from 'sonner'
import { useTransition } from 'react'

const formSchema = z.object({
  title: z.string().min(1, 'Post title is required!'),
  body: z.string().min(1, 'Post body is required!')
})

export type PostFormData = z.infer<typeof formSchema>

const PostForm = ({ addNewPost }: { addNewPost: (newPost: Post) => void }) => {
  const form = useForm<PostFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: ''
    }
  })
  const [isPending, startTransition] = useTransition()

  const onSubmit = (formData: PostFormData) => {
    startTransition(async () => {
      const { error, data } = await createPost(formData)
      if (error) {
        toast.error(error.message)
        return
      }

      addNewPost(data!)
      form.reset()
    })
  }

  return (
    <section className="max-w-xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Post content" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default PostForm
