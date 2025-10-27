"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { addKunde } from '../actions';

const formSchema = z.object({
  name: z.string().min(2, { message: "Der Name muss mindestens 2 Zeichen lang sein." }),
  email: z.string().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
  phone: z.string().min(5, { message: "Bitte geben Sie eine gültige Telefonnummer ein." }),
  address: z.string().min(5, { message: "Bitte geben Sie eine gültige Adresse ein." }),
});

export function KundeForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await addKunde(values);
      toast({
        title: "Kunde erfolgreich erstellt",
        description: `${values.name} wurde zu Ihren Kunden hinzugefügt.`,
      });
      router.push('/kunden');
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Der Kunde konnte nicht erstellt werden.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vollständiger Name</FormLabel>
              <FormControl>
                <Input placeholder="Erika Mustermann" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail-Adresse</FormLabel>
              <FormControl>
                <Input placeholder="erika@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefonnummer</FormLabel>
              <FormControl>
                <Input placeholder="0123 456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vollständige Adresse</FormLabel>
              <FormControl>
                <Input placeholder="Musterstraße 1, 12345 Musterstadt" {...field} />
              </FormControl>
              <FormDescription>
                Wird für die Routenplanung und Rechnungsstellung verwendet.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Kunde speichern"}
        </Button>
      </form>
    </Form>
  );
}
