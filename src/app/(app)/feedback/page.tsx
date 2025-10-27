import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function FeedbackPage() {
  return (
    <>
      <PageHeader title="Feedback-Inbox" />
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Kundenfeedback</CardTitle>
              <CardDescription>
                Hier erscheinen die Feedbacks Ihrer Kunden. Sie können sie beantworten und für Ihre Landingpage freischalten.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">Noch kein Feedback erhalten.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
