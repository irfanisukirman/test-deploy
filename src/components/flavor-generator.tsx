'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateFlavorfulDescription } from '@/app/actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  productName: z.string().min(2, 'Product name must be at least 2 characters.'),
  customerReviews: z
    .string()
    .min(10, 'Please provide some customer reviews.')
    .max(2000, 'Reviews are too long. Please summarize.'),
});

type FormValues = z.infer<typeof formSchema>;

export function FlavorGenerator() {
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: 'Croissant',
      customerReviews:
        "Review 1: The croissant was incredibly buttery and flaky. The layers just melted in my mouth. Best I've had outside of Paris!\nReview 2: So light and airy. You can really taste the quality of the butter. A perfect breakfast treat.\nReview 3: A bit pricey, but the flaky texture and rich buttery flavor are worth it.",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneratedDescription('');
    try {
      const result = await generateFlavorfulDescription(values);
      if (result.description) {
        setGeneratedDescription(result.description);
      } else {
        throw new Error('Failed to generate description.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description:
          'Could not generate a description. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>AI Flavor Scribe</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sourdough Bread" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerReviews"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Reviews</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste customer reviews here..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Our AI will analyze reviews to create a tasty description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  'Generating...'
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Description
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Wand2 className="h-12 w-12 animate-pulse text-primary" />
            <p className="text-muted-foreground">Crafting the perfect words...</p>
          </div>
        ) : generatedDescription ? (
          <Card className="bg-accent w-full">
            <CardHeader>
              <CardTitle>Generated Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-serif italic text-accent-foreground">
                "{generatedDescription}"
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>Your generated product description will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
