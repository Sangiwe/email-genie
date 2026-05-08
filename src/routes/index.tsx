import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Mail, Sparkles, Copy, Loader2, Inbox } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AI Email Generator — Write Perfect Emails Instantly" },
      { name: "description", content: "Generate professional or casual emails in seconds with AI. Just describe what you need." },
    ],
  }),
});

type GeneratedEmail = {
  subject: string;
  greeting: string;
  body: string;
  closing: string;
};

function Index() {
  const [tone, setTone] = useState<"formal" | "informal">("formal");
  const [purpose, setPurpose] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<GeneratedEmail | null>(null);

  const handleGenerate = async () => {
    if (!purpose.trim() || !details.trim()) {
      toast.error("Please fill in both the purpose and key details.");
      return;
    }
    setLoading(true);
    setEmail(null);
    try {
      const { data, error } = await supabase.functions.invoke("generate-email", {
        body: { tone, purpose, details },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setEmail(data.email);
    } catch (e: any) {
      toast.error(e.message || "Failed to generate email");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!email) return;
    const text = `Subject: ${email.subject}\n\n${email.greeting}\n\n${email.body}\n\n${email.closing}`;
    navigator.clipboard.writeText(text);
    toast.success("Email copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div
        className="border-b"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-4xl px-6 py-16 text-center text-primary-foreground">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur mb-6">
            <Inbox className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            AI Email Generator
          </h1>
          <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
            Describe what you need to say. We'll write the perfect email for you.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-6 py-10 grid gap-6 md:grid-cols-2">
        <Card className="p-6 space-y-5" style={{ boxShadow: "var(--shadow-elegant)" }}>
          <div className="space-y-3">
            <Label>Email type</Label>
            <RadioGroup
              value={tone}
              onValueChange={(v) => setTone(v as "formal" | "informal")}
              className="flex gap-3"
            >
              <Label
                htmlFor="formal"
                className={`flex-1 cursor-pointer rounded-lg border-2 p-3 text-center transition ${
                  tone === "formal" ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <RadioGroupItem id="formal" value="formal" className="sr-only" />
                <div className="font-medium">Formal</div>
                <div className="text-xs text-muted-foreground">Professional tone</div>
              </Label>
              <Label
                htmlFor="informal"
                className={`flex-1 cursor-pointer rounded-lg border-2 p-3 text-center transition ${
                  tone === "informal" ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <RadioGroupItem id="informal" value="informal" className="sr-only" />
                <div className="font-medium">Informal</div>
                <div className="text-xs text-muted-foreground">Friendly tone</div>
              </Label>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose of the email</Label>
            <Input
              id="purpose"
              placeholder="e.g. Request a meeting with my manager"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              maxLength={200}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Key details</Label>
            <Textarea
              id="details"
              placeholder="e.g. Discuss Q3 roadmap, suggest Tuesday or Thursday afternoon, 30 minutes"
              rows={5}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              maxLength={1000}
            />
          </div>

          <Button onClick={handleGenerate} disabled={loading} className="w-full" size="lg">
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Generate Email</>
            )}
          </Button>
        </Card>

        <Card className="p-6 min-h-[400px] flex flex-col" style={{ boxShadow: "var(--shadow-elegant)" }}>
          {!email && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
              <Mail className="w-12 h-12 mb-3 opacity-30" />
              <p>Your generated email will appear here</p>
            </div>
          )}
          {loading && (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          {email && (
            <div className="space-y-4 flex-1">
              <div className="pb-3 border-b">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Subject</div>
                <div className="font-semibold mt-1">{email.subject}</div>
              </div>
              <div className="space-y-3 text-sm whitespace-pre-wrap leading-relaxed">
                <p>{email.greeting}</p>
                <p>{email.body}</p>
                <p>{email.closing}</p>
              </div>
              <Button onClick={handleCopy} variant="outline" className="w-full mt-4">
                <Copy className="mr-2 h-4 w-4" /> Copy to clipboard
              </Button>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
